// 200
// 400
// 500
export const responseApi = (res, code, data, message) => {
    res.status(code).json({
        message: message,
        data: data,
        date: new Date()
    })
}