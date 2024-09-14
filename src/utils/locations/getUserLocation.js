const getUserLocation = (onSuccess, onError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSuccess(latitude, longitude);
      },
      (error) => {
        onError("Nie można uzyskać dostępu do lokalizacji użytkownika", error);
      }
    );
  } else {
    onError("Geolokalizacja nie jest wspierana w tej przeglądarce");
  }
};

export { getUserLocation };
