import http from "../http-common";

class WorkshopDataService {
  getAll() {
    return http.get("/workshops");
  }

  get(id) {
    return http.get(`/workshops/${id}`);
  }

  create(data) {
    return http.post("/workshops", data);
  }

  update(id, data) {
    return http.put(`/workshops/${id}`, data);
  }

  delete(id) {
    return http.delete(`/workshops/${id}`);
  }

  deleteAll() {
    return http.delete(`/workshops`);
  }

  findByTitle(title) {
    return http.get(`/workshops?title=${title}`);
  }
}

export default new WorkshopDataService();