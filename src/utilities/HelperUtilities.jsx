export const HelperUtilities = {
  imageUrlToBase64: async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        const base64Image = base64data.split(',')[1];
        resolve(base64Image);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
};

