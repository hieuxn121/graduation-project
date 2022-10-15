import axios from 'axios'
const courseApi = {
  a: () => { }
}
courseApi.getListCourses = async (body) => {
  try {
    let courses = []
    courses = await axios({
      method: 'post',
      url: "http://localhost:3002/api/v1/course",
      headers: {},
      data: {
        ...body
      }
    });
    return courses;
  } catch (error) {
    return error
  }
}
courseApi.getListMyCourse = async (body) => {
  try {
    let courses = []
    courses = await axios({
      method: 'post',
      url: "http://localhost:3002/api/v1/course/my-courses",
      headers: {},
      data: {
        ...body
      }
    });
    return courses;
  } catch (error) {
    return error
  }
}
courseApi.getListLesson = async (courseId) => {
  try {
    let lessons = []
    lessons = await axios({
      method: 'get',
      url: `http://localhost:3002/api/v1/course/${courseId}/lessons`,
      headers: {},
    });
    return lessons;
  } catch (error) {
    return error
  }
}

courseApi.checkCourseCode = async (input) => {
  try {
    const course = await axios({
      method: 'post',
      url: "http://localhost:3002/api/v1/course/detail",
      headers: {},
      data: {
        ...input
      }
    });
    return course;
  } catch (error) {
    return error
  }
}
courseApi.getListCates = async () => {
  try {
    const categories = await axios('http://localhost:3002/api/v1/categories')
    return categories;
  } catch (error) {
    return error
  }
}
courseApi.getDetailProd = async (body) => {
  try {
    const url = 'http://localhost:3003/courses/' + body
    const courses = await axios(url)
    return courses
  } catch (error) {
    return error
  }
}
courseApi.getcourseSearched = async (body) => {
  try {
    const url = 'http://localhost:3003/courses/' + body
    const courses = await axios(url)
    return courses
  } catch (error) {
    return error
  }
}
export default courseApi;