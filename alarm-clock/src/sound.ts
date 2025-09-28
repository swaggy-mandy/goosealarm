const SOUND_FILE_PATH = 'path/to/sound/file.mp3';

export function playSound() {
    const audio = new Audio(SOUND_FILE_PATH);
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}