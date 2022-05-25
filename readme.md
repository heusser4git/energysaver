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

- Devices implementieren (Waschmaschine, ...)
  - DB für devices
  - Object/Repo für devices
  - REST-route für devices
- installation
  ~~- create database script~~
  - anleitung
  - tests


Databases
wetter  -> siehe system/wetter
sbfspot -> siehe system/sbfspot Tabellen mit CreateMySQLDB.sql erstellen und sbfspot.bak einlesen




**REST-API**
http://localhost:<port>/                                    Gibt die index.html aus dem Verzeichnis view aus

_Photovoltaik_
http://localhost:<port>/pvData/                             Gibt alle PV-Eintraege aus
http://localhost:<port>/pvData/1652554800-1652558400        Gibt alle PV-Eintraege waehrend einer definierten Periode aus
http://localhost:<port>/pvData/current                      Holt den aktuellsten PV-Eintrag bis max. 5min zurueck oder gibt ein leeres Objekt aus

_Wetter_
http://localhost:<port>/wetter/daily/                       Gibt alle täglichen Wetterprognosen aus
http://localhost:<port>/wetter/daily/1652554800-1652558400  Gibt alle täglichen Wetterprognosen waehrend einer definierten Periode aus
http://localhost:<port>/wetter/daily/449                    Gibt gibt die tägliche Wetterprognose mit der angegebenen ID aus

_Strommessung Hauseingang_
http://localhost:<port>/power/                             Gibt alle Power-Eintraege aus
http://localhost:<port>/power/1652554800-1652558400        Gibt alle Power-Eintraege waehrend einer definierten Periode aus
http://localhost:<port>/power/current                      Holt den aktuellsten Power-Eintrag bis max. 5min zurueck oder gibt ein leeres Objekt aus




DOKU
fs -> What is Synchronous and Asynchronous approach? -> https://www.geeksforgeeks.org/node-js-file-system/