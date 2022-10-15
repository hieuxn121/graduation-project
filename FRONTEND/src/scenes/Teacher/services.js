import axios from 'axios'
const courseApi = {
    a: () => {}
} 
courseApi.getListTeachers = async() => {
    try {
        let teachers = []
            teachers = await axios({
                method: 'get',
                url: "http://localhost:3002/api/v1/teachers",
                headers: {}, 
            });
        return teachers;  
    } catch (error) {
        return error
    }
}
export default courseApi;