module.exports = {
    Roboto: {
        normal: Buffer.from(
            require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Robot-Regular.ttf"],
            "base64"
        ),
        bold: Buffer.from(
            require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Robot-Regular.ttf"],
            "base64"
        ),
    },
};