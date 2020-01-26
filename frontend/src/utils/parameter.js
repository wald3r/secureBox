const downloadLink = 'localhost:3003/api/files/download/public/'
const lastUsed = 20
const notificationTime = 5000
const errorTime = 5000
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'application/txt', 'application/rtf', 'application/rtc',
                          'application/json', ]

export default { downloadLink, lastUsed, allowedMimeTypes, notificationTime, errorTime }