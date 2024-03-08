MedicalScanTest-Products
------------------------

Mappák szerepe
--------------

MedicalScan01 - a fő backend projekt
TestProject1 - a fő backend tesztelését végző projekt

MedicalScan01UI - az Angular frontend projekt

Angular frontend elindítása
---------------------------

Előfeltételek:

Node telepítése (Windows 10 rendszerre a nodejs.org-on lévő stabil kiadásából)
Angular CLI telepítése (Node telepítés után: npm install -g @angular/cli)

A projekt első indítása előtt a projekt mappáján belül le kell futtatni:
npm install

Utána mehet az indítás:
ng serve

ASP.NET Core API backend elindítása
-----------------------------------

A fő backend projekt mappájában lévő solution fájlt kell megnyitni, ez benyitja majd a TestProject1 fájljait is.
Az első build után a felső menüsorból indítható a projekt a 'https' config segítségével.
Az első indítás előtt a rendszer megkérdezheti, hogy engedélyezzük-e a tanúsítványok használatát a projekthez. Mindkét esetben IGEN a válasz.
Ezután előfordulhat, hogy a megnyíló böngésző nem jeleníti meg az alap Swagger oldalt, de a háttérben a backend már futni fog.

Egyéb információk
-----------------
A helyes indításhoz szükséges sorrend: backend indítása, utána frontend indítása

A backend projektben benne hagytam a Visual Studio 2022 által generált template controllert.
A ProductController-ben dolgoztam, az elérési útja a CRUD-műveleteknek '/Product' kezdetű.

Elsősorban a backend és a frontend követelmények szerinti elkészítését tartottam szem előtt, tehát ebben az esetben nem TDD elvek mentén dolgoztam.
A TestProject1 a backend elkészülése után lett megírva. Angular alatt a ProductDataComponent alatt próbáltam tesztet írni, de sajnos mivel nincs sok tapasztalatom vele, nem jártam sikerrel.
