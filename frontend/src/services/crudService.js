import http from "../http-common";

class crudService {

  addStudent(data) {

    let dataForm = new FormData();
    dataForm.append("firstName", data.firstName)
    dataForm.append("lastName", data.lastName)
    dataForm.append("dob", data.dob)
    dataForm.append("courseName", data.courseName)
    dataForm.append("hours", data.hours)
    dataForm.append("price", data.price)


    return http.post("/insert", dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }


  updateStudent(data) {

    let dataForm = new FormData();
    dataForm.append("id", data.id)
    dataForm.append("firstName", data.firstName)
    dataForm.append("lastName", data.lastName)
    dataForm.append("dob", data.dob)
    dataForm.append("courseName", data.courseName)
    dataForm.append("hours", data.hours)
    dataForm.append("price", data.price)


    return http.post("/update", dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },

    });
  }

  getStudents() {
    return http.get("/all");
  }

  getStudentById(id) {
    return http.get("/getById/" + id);
  }

  deleteStudent(id) {
    let dataForm = new FormData();
    dataForm.append("id", id)
    return http.post("/delete", dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new crudService();