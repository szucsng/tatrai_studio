export function isVideoFile(filename: string): boolean {
  return /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(filename)
}
