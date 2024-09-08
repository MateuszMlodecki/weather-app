Weather App - https://mateuszmlodecki.github.io/weather-app/

Aplikacja pogodowa, która pozwala użytkownikom sprawdzać aktualne warunki pogodowe oraz prognozy dla wybranego miasta. Aplikacja korzysta z geolokalizacji do automatycznego ustalania lokalizacji użytkownika i pobierania danych pogodowych.

Funkcje
Aktualna Pogoda: Wyświetla bieżące warunki pogodowe, takie jak temperatura, wilgotność, odczuwalna temperatura i prędkość wiatru.
Prognoza Pogody: Przedstawia prognozę pogody na nadchodzące dni z maksymalnymi temperaturami i ikonami pogodowymi.
Wyszukiwanie Miasta: Pozwala użytkownikom wyszukiwać pogodę dla dowolnego miasta.
Automatyczne Ustalanie Lokalizacji: Używa geolokalizacji do automatycznego ustalania lokalizacji użytkownika i wyświetlania pogody dla tego miejsca.
Technologie
React: Biblioteka do budowania interfejsów użytkownika.
OpenWeatherMap API: API do pobierania danych o pogodzie i prognozach.
CSS: Stylizacja komponentów aplikacji.

Instalacja:

```git clone https://github.com/MateuszMlodecki/weather-app.git
cd weather-app
npm install
npm run start
```

Konfiguracja:
API Key: Upewnij się, że masz swój klucz API do OpenWeatherMap. Możesz go dodać w plikach konfiguracyjnych lub bezpośrednio w kodzie, jeśli nie używasz zmiennych środowiskowych.
Jak Używać
Otwórz aplikację w przeglądarce.
Wpisz nazwę miasta w polu wyszukiwania i kliknij „Szukaj” lub pozwól aplikacji automatycznie ustalić Twoją lokalizację.
Przeglądaj aktualne warunki pogodowe oraz prognozy na nadchodzące dni.
