# 🌦️ Open Weather Matis Project

<img width="676" height="423" alt="Capture d&#39;écran 2026-01-12 150456" src="https://github.com/user-attachments/assets/0d9e8505-7dd2-49a9-82bc-a9fa1bb1c763" />

## Présentation

**Open Weather** est une application web permettant d’afficher les conditions météorologiques actuelles ainsi que les prévisions en fonction de la **localisation géographique de l’utilisateur** ou d’une **ville saisie manuellement**.

- **Projet de développement web personnel**. 
- Il s’appuie sur l’API **OpenWeatherMap (One Call API)** afin de récupérer les données météo en temps réel.
- L’application est conçue pour être **responsive** (PC / smartphone) et capable de **gérer un changement de localisation du device**.

<img width="588" height="620" alt="Capture d&#39;écran 2026-01-12 145722" src="https://github.com/user-attachments/assets/8b3c5e3a-396e-4f6a-bb8e-a38c79358b31" />

## 🚀 Installation et utilisation

### Cloner le repository

```bash
git clone https://github.com/ton-utilisateur/open-weather.git
cd open-weather
```
### Configurer l’API OpenWeatherMap
> ⚠️ Il faut se créer un compte sur :
https://openweathermap.org/
>
> Afin de pouvoir générer une clé API

Renseigner la clé API dans le fichier Openweather.js
```bash
const API_KEY = "VOTRE_CLE_API";
```
### Lancer le projet
Ouvrir simplement le fichier index.html dans un navigateur web :
```bash
ouvrir index.html
```
---
> ⚠️ Toute la documenattion nécessaire se trouve sur le site web open weather 
### Documentation API
- OpenWeatherMap – One Call API
https://openweathermap.org/api/one-call-api

---
### Gestion du cache

Afin de respecter la limitation de requêtes de l’API OpenWeatherMap (version gratuite), un système de cache côté client est mis en place (via localStorage).
Les données météo sont stockées temporairement
Une nouvelle requête n’est effectuée que si les données sont expirées ou si la localisation change

## Objectifs du projet

- Récupérer la **position géographique du navigateur**
- Afficher la météo via l’API **OpenWeatherMap**
- Mettre en place un **système de cache** afin de limiter le nombre de requêtes API (version gratuite)
- Concevoir une **interface responsive**
- Permettre la recherche météo par **ville**
- Gérer le **changement de localisation** de l’utilisateur

---

## Fonctionnalités

-  Détection automatique de la localisation ```class="localisation"```
-  Recherche météo par nom de ville ```name="city"```
-  Température actuelle et ressentie ```class="current-wheater"```
-  Vent, humidité ```id="windSpeedVal" et id="humidityVal"```
-  Lever et coucher du soleil ```class="sunrise-sunset"```
-  Qualité de l’air ```class="air-indices"```
-  Prévisions sur plusieurs jours ```class="day-forecast"```
-  Interface responsive (PC / smartphone) ```@media (max-width: ....px){}```

---
