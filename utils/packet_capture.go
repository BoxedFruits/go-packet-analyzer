package PacketCapture

import (
	"fmt"
	"log"
	"os/exec"
	"regexp"
	"strings"
)

//
// type NetworkInterface struct {
// 	enabled     bool
// 	isCapturing bool
// }

type Interface struct {
	Name    string
	Details map[string]string
}

type NetworkInterfaces struct {
	Interfaces []Interface
}

func (networkInterfaces *NetworkInterfaces) GetNetworkInterfaces() []Interface {
	out, err := exec.Command("ip", "link", "show").Output()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(out))

	interfaces, err := parseIpLinkShow(string(out))
	if err != nil {
		fmt.Println("Error parsing output:", err)
	}
	for _, iface := range interfaces {
		fmt.Println("Interface:", iface.Name, iface.Details)
		for key, value := range iface.Details {
			fmt.Printf("  %s: %s\n", key, value)
		}
		fmt.Println()
	}

	return interfaces
}

// ---Parsing interfaces
// Seperate each interface into its own blob
// start where there is a number followed by a colon ex. 1: or 13:
// start at that index, each line where it is tabbed is apart of that index's information
// build out string array with that
//
// process string array
// seperate useful things into a map of details

// for now, only get the interface name
func parseIpLinkShow(output string) ([]Interface, error) {
	var interfaces []Interface
	var currentInterface Interface
	currentInterface.Details = make(map[string]string)

	lines := strings.Split(output, "\n")
	for _, line := range lines {
		// Check if it's the start of a new interface
		if match, _ := regexp.MatchString(`^\d+:\s`, line); match {
			if currentInterface.Name != "" {
				interfaces = append(interfaces, currentInterface)
			}
			currentInterface = Interface{}
			currentInterface.Details = make(map[string]string)
			currentInterface.Name = strings.Split(line, ":")[1]
		} else if line != "" { // Ignore empty lines
			// Extract key-value pairs (if any)
			fmt.Println(line)
			key, value := extractKeyValue(line)
			if key != "" {
				currentInterface.Details[key] = value
			}
		}
	}

	// Add the last interface
	if currentInterface.Name != "" {
		interfaces = append(interfaces, currentInterface)
	}

	return interfaces, nil
}

func extractKeyValue(line string) (string, string) {
	// Example: "<BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500"
	flagsRegex := regexp.MustCompile(`^<(.*?)>`)
	mtuRegex := regexp.MustCompile(`mtu (\d+)`)
	qdiscRegex := regexp.MustCompile(`qdisc (\w+)`)
	stateRegex := regexp.MustCompile(`state (\w+)`)

	if flagsMatch := flagsRegex.FindStringSubmatch(line); flagsMatch != nil {
		return "Flags", flagsMatch[1]
	}

	if mtuMatch := mtuRegex.FindStringSubmatch(line); mtuMatch != nil {
		return "MTU", mtuMatch[1]
	}

	if qdiscMatch := qdiscRegex.FindStringSubmatch(line); qdiscMatch != nil {
		return "qdisc", qdiscMatch[1]
	}

	if stateMatch := stateRegex.FindStringSubmatch(line); stateMatch != nil {
		return "state", stateMatch[1]
	}

	// Add more key-value extraction patterns as needed
	return "", ""
}

// func (networkInferface *NetworkInterface) Capture() {
//
// }
//
// func EndCapture() {
//
// }
