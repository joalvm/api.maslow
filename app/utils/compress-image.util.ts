import Compressor from 'compressorjs';

export default async function compressImage(file: File): Promise<File | Blob> {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 0.6,
            maxWidth: 1024,
            maxHeight: 1024,
            success(result) {
                resolve(result);
            },
            error(err) {
                reject(err);
            },
        });
    });
}
