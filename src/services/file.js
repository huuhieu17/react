import { apiLoggedInInstance } from "../utils/api";

/**
 * Hàm này là hàm upload file
 * @param {FormData} file - 
 * @return FileObject
 */
export const uploadFile = async (file) => {
   return await apiLoggedInInstance({
        url: '/api/file/upload',
        method: "POST",
        data: file,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}


/**
 * Api view file
 * @param {string} path 
 * @returns {Blob} File 
 */
export const viewFile = async (path) => {
    return await apiLoggedInInstance({
        url: '/api/file/view/'+path,
        method: "GET",
        responseType: 'blob'
    })
}