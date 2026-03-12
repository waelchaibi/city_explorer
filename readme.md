# City Explorer Lite

**Version : 1.0**  
**Technologies :** React Native (JSX) + Expo SDK 54  

---

## 1️⃣ Pitch & User Stories

City Explorer Lite est une **application mobile pour suivre et organiser vos visites en ville**.  
Elle permet de **prendre des photos, enregistrer la localisation et la date**, afficher les lieux sur une **carte**, les filtrer par **calendrier** ou **tags**, et visualiser vos **statistiques de visites**.  

**User Stories principales :**  
- **Ajouter un lieu** avec photo, nom, description, tags et localisation.  
- **Voir tous les lieux sur une carte** avec marqueurs et détail.  
- **Filtrer par date** avec le calendrier.  
- **Voir une liste filtrable et triée** des lieux.  
- **Consulter un profil** avec statistiques : nombre total de lieux, jour le plus actif.  
- **Notifications locales** pour rappeler de visiter ou ajouter un lieu.  
- **Stockage offline** avec AsyncStorage.

---

## 2️⃣ Stack & Prérequis

**Stack technique :**  
- Expo SDK 54  
- React Native (JSX)  
- @react-navigation/native + native-stack + bottom-tabs + drawer  
- expo-camera, expo-image-picker  
- react-native-maps + expo-location  
- react-native-calendars  
- AsyncStorage (`@react-native-async-storage/async-storage`)  
- expo-notifications  

**Prérequis :**  
- Node.js >= 18  
- npm ou yarn  
- Expo CLI : `npm install -g expo-cli`  
- Expo Go sur téléphone pour tester l’app  

---

## 3️⃣ Installation & Lancement

1. Cloner le dépôt :  
```bash
git clone 
cd CityExplorerLite