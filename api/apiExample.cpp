#include <SPI.h>
#include <WiFiNINA.h>

char ssid[] = "yourSSID";     // your network SSID (name)
char pass[] = "yourPASSWORD"; // your network password
int status = WL_IDLE_STATUS;  // the Wifi radio's status

void setup()
{
    Serial.begin(9600);

    // attempt to connect to WiFi network
    while (status != WL_CONNECTED)
    {
        Serial.print("Attempting to connect to SSID: ");
        Serial.println(ssid);
        status = WiFi.begin(ssid, pass);
        delay(10000); // wait 10 seconds for connection
    }
}

void loop()
{
    // make HTTP POST request
    if (WiFi.status() == WL_CONNECTED)
    {
        HTTPClient http;

        // replace with your PHP server IP or domain
        http.begin("http://your-server-ip-or-domain/api/createMachine.php");

        // specify content type
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // replace with your machine parameters
        String postData = "machineName=testMachine&machineIp=192.168.1.100&otherParam=value";

        int httpResponseCode = http.POST(postData);

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println("Server response: " + response);
        }
        else
        {
            Serial.print("HTTP POST request failed, error: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    }

    delay(5000); // wait 5 seconds before the next request
}
