# Energy Saver
Der Energy Saver sammelt Daten über Stromproduktion, aktuellen Strombezug/-rücklieferung, sowie die Wetterprognose für die nächsten Tage.
Grafisch aufbereitet werden in der aktuellen Version:
- Die aktuelle Stromproduktion
- Der aktuelle Strombezug/-rücklieferung
- Die Energie- und Stromproduktion, der Stromkauf und -verkauf des aktuellen Tages als Chart
- Die Wetterprognose der nächsten Tage

### **VORAUSSETZUNGEN**
1. Datenbankserver MySQL
   1. Datenbankuser mit Berechtigung Datenbanken zu erstellen, Tabellen zu erstellen, CRUD Operationen auszuführen
2. Node.js >= Version 16
   1. Node-Module gemäss _package.json_

### **INSTALLATION**
1. Herunterladen des Energy Savers: https://github.com/heusser4git/energysaver.git
2. Erstellen der Datenbanken durch Einspielen der Scripts aus dem Verzeichnis ./system: `\. <path>\CreateMySQL_..._DB.sql`
   1. Datenbank Power -> CreateMySQL_Power_DB.sql
   2. Datenbank Device -> CreateMySQL_Device_DB.sql
   3. Datenbank Wetter -> CreateMySQL_Wetter_DB.sql
   4. Datenbank SBFspot -> CreateMySQL_SBFspot_DB.sql
3. Optional: Für den Demomode werden Templatedaten aus dem Verzeichnis ./system für die PV-Daten eingespielt: `\. <path>\sbfspot.bak`
   1. Datenbank SBFspot -> sbfspot.bak
4. Optional: Für den Demomode werden Templatedaten aus dem Verzeichnis ./system für die Power-Daten eingespielt: `\. <path>\power.bak`
   1. Datenbank Power -> power.bak
5. Konfigruationsinformationen für die Datenbankverbindungen unter ./model/secredata ablegen:
   1. JSON-Files erstellen:
      1. dbPower.json
      2. dbDevice.json
      3. dbSBFspot.json
      4. dbWeather.json
      ![](./readme/readme_secretdata.png "Secretdata-Folder Printscreen")
   2. Jeweils die DB-Verbinungsinformation als JSON-Objekt in den Files ablegen in der Form:
   3. `{
      "password": "xxx",
      "user": "xxx",
      "database": "xxx",
      "host": "xxx",
      "port": 3306
      }`
6. Konfigruationsinformationen für die REST-APIs unter ./model/secredata ablegen:
   1. JSON-Files erstellen:
      1. openweather.json
      2. shelly.json
   2. Openweatherapi
      1. Erstellen eines API-Key auf openweathermap.org
      2. Längen- und Breitengrad des gewünschten Standorts ermitteln (www.latlong.net)
      3. `{
         "apikey": "<YOUR_API-KEY>",
         "latitude": <YOUR_LATITUDE>,
         "longitude": <YOUR_LONGITUTE>
         }`
   3. Shelly (Powersensor)
      1. `{
         "ip": "192.168.1.3",
         "port": "80",
         "protocol": "http"
         }`
7. Module installieren: `npm install axios express mysql2`
8. Optional: Modul mocha für die UnitTests installieren: `npm install mocha`
9. Server starten:
   1. Root-Verzeichnis der App:
      1. `npm start`


### **REST-API**
_**Default Server-Port: 1234**_

`http://<localhost>:<port>/`

Gibt die index.html aus dem Verzeichnis `view` aus

_**Photovoltaik**_

`http://<localhost>:<port>/pvData/` 

Gibt alle PV-Einträge aus

`http://<localhost>:<port>/pvData/1652554800-1652558400`

Gibt alle PV-Einträge während einer definierten Periode aus

`http://<localhost>:<port>/pvData/current`

Holt den aktuellsten PV-Eintrag bis max. 5min zurück oder gibt ein leeres Objekt aus

_**Wetter**_

`http://<localhost>:<port>/wetter/daily/`

Gibt alle täglichen Wetterprognosen aus

`http://<localhost>:<port>/wetter/daily/1652554800-1652558400`

Gibt alle täglichen Wetterprognosen während einer definierten Periode aus


**_Strommessung Hauseingang_**

`http://<localhost>:<port>/power/`

Gibt alle Power-Einträge aus

`http://<localhost>:<port>/power/1652554800-1652558400`

Gibt alle Power-Einträge während einer definierten Periode aus

`http://<localhost>:<port>/power/current`

Holt den aktuellsten Power-Eintrag bis max. 5min zurück oder gibt ein leeres Objekt aus

**_Geräte_**

`http://<localhost>:<port>/device/`

Gibt alle Geräte aus


### **UNIT TESTING**
_Voraussetzung: Installation von Module "mocha" siehe oben._

Start Unit-Tests mit `npm run test` im Root-Verzeichnis
