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
  },
  dataURLtoFile: (dataurl, filename = "image.jpg") => {
        const [header, b64] = dataurl.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(b64);
        const len = binary.length;
        const u8arr = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            u8arr[i] = binary.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
    },
    imageUrlToFile: async (imageUrl, filename = "image.jpg") => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const mimeType = blob.type || "image/jpeg";
      return new File([blob], filename, { type: mimeType });
    },
    formatComplexExplanation: (text) => {
        if (!text) return "";

        const lines = text.split('\n');
        const formattedLines = lines.map(line => {
        if (line.startsWith("1. Whether the picture has been tampered with")) {
            const parts = line.split(":");
            if (parts.length > 1) {
            return "1." + parts.slice(1).join(":").trim();
            }
        }
        return line;
        });

        return formattedLines.join('\n');
    }
};

