export const resizeImage = (img : string | undefined, width : number) => {
    function urlParser(oldUrl: string): string {
        // Menggunakan encodeURIComponent() untuk mengkodekan karakter khusus
        const encodedUrl = encodeURIComponent(oldUrl);
        // Menambahkan parameter ?width=300 ke akhir URL
        const newUrl = encodedUrl;
        return newUrl;
    }
    const url = `https://imagecdn.app/v2/image/${urlParser(img!)}?width=${width}`;
    return url;
};