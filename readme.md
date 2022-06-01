# Energy Saver
Der Energy Saver sammelt Daten über Stromproduktion, aktuellen Strombezug/-rücklieferung, sowie die Wetterprognose für die nächsten Tage.
Grafisch aufbereitet werden in der aktuellen Version:
- Die aktuelle Stromproduktion
- Der aktuelle Strombezug/-rücklieferung
- Die Energie- und Stromproduktion, der Stromkauf und -verkauf des aktuellen Tages als Chart
- Die Wetterprognose der nächsten Tage

###**VORAUSSETZUNGEN**
1. Datenbankserver MySQL
   1. Datenbankuser mit Berechtigung Datenbanken zu erstellen, Tabellen zu erstellen, CRUD Operationen auszuführen
2. Node.js >= Version 16
   1. Node-Module gemäss _package.json_

###**INSTALLATION**
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
      1. `{
         "apikey": "bcd3c8bcec345c7a611141e3cc3b8257",
         "latitude": 46.9821456,
         "longitude": 9.5761204
         }`
   3. Shelly (Powersensor)
      1. `{
         "ip": "192.168.1.3",
         "port": "80",
         "protocol": "http"
         }`
7. Module installieren: `npm install axios body-parser express mysql2`
8. Optional: Modul mocha für die UnitTests installieren: `npm install mocha`
9. Server starten:
   1. Root-Verzeichnis der App:
      1. `npm start`


###**REST-API**
_**Default Server-Port: 1234**_

`http://<localhost>:<port>/`
Gibt die index.html aus dem Verzeichnis view aus

_**Photovoltaik**_

`http://<localhost>:<port>/pvData/` 

Gibt alle PV-Eintraege aus

`http://<localhost>:<port>/pvData/1652554800-1652558400`

Gibt alle PV-Eintraege waehrend einer definierten Periode aus

`http://<localhost>:<port>/pvData/current`

Holt den aktuellsten PV-Eintrag bis max. 5min zurueck oder gibt ein leeres Objekt aus

_**Wetter**_

`http://<localhost>:<port>/wetter/daily/`

Gibt alle täglichen Wetterprognosen aus

`http://<localhost>:<port>/wetter/daily/1652554800-1652558400`

Gibt alle täglichen Wetterprognosen waehrend einer definierten Periode aus

`http://<localhost>:<port>/wetter/daily/449`

Gibt gibt die tägliche Wetterprognose mit der angegebenen ID aus

**_Strommessung Hauseingang_**

`http://<localhost>:<port>/power/`

Gibt alle Power-Eintraege aus

`http://<localhost>:<port>/power/1652554800-1652558400`

Gibt alle Power-Eintraege waehrend einer definierten Periode aus

`http://<localhost>:<port>/power/current`

Holt den aktuellsten Power-Eintrag bis max. 5min zurueck oder gibt ein leeres Objekt aus

**_Geräte_**

`http://<localhost>:<port>/device/`

Gibt alle Geräte aus


###**UNIT TESTING**
Start Unit-Tests with `npm test` in the Root-Director

_TIPP: Korrigiere erst die Test-Pfade in package.json unter `"test:Divers":`_


.................................................................................

// TODO
~~- routen für weather~~
~~- daten von shelly abholen~~
~~- routen für shelly~~
~~- secretdata einbinden~~
~~- test mit express: website ausgeben~~

~~- close connections!!!~~
~~- demodatageneratoren: ~~sbfspot~~, ~~shelly~~~~
- create helper class
~~- openweathermap (key remove)~~
~~- Shelly (secretdata implementation)~~

- ~~Devices implementieren (Waschmaschine, ...)~~
  - ~~DB für devices~~
  - ~~Object/Repo für devices~~
  - ~~REST-route für devices~~
~~- installation~~
  ~~- create database script~~
  ~~- anleitung~~
  ~~- tests~~
  - ~~zeitverschiebung power und pv im chart~~
  - ~~vollständigkeit der wetterdaten (icon)???~~
  ~~- implement more realistic power demo data~~



DOKU
fs -> What is Synchronous and Asynchronous approach? -> https://www.geeksforgeeks.org/node-js-file-system/

5min interval mit SQL:
https://www.codelabs365.com/mysql-group-data-by-15-minutes/

problems with timezoneshift...