import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood"},
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

function App() {
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    id: "",
    personaje: "",
    anime: "",
  });
  const [dataState, setDataState] = useState(data);

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = (dato) => {
    setDataState(prevState => {
      return prevState.map(registro => {
        if (dato.id === registro.id) {
          return {
            ...registro,
            personaje: dato.personaje,
            anime: dato.anime
          };
        }
        return registro;
      });
    });
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    const opcion = window.confirm("¿Estás seguro que deseas Eliminar el elemento " + dato.id + "?");
    if (opcion) {
      setDataState(prevState => prevState.filter(registro => registro.id !== dato.id));
      setModalActualizar(false);
    }
  };

  const insertar = () => {
    const valorNuevo = { ...form };
    valorNuevo.id = dataState.length + 1;
    setDataState(prevState => [...prevState, valorNuevo]);
    setModalInsertar(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Personaje</th>
              <th>Anime</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {dataState.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.personaje}</td>
                <td>{dato.anime}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarModalActualizar(dato)}
                  >
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div><h3>Editar Registro</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Personaje:
            </label>
            <input
              className="form-control"
              name="personaje"
              type="text"
              onChange={handleChange}
              value={form.personaje}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Anime:
            </label>
            <input
              className="form-control"
              name="anime"
              type="text"
              onChange={handleChange}
              value={form.anime}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => editar(form)}
          >
            Editar
          </Button>
          <Button
            color="danger"
            onClick={cerrarModalActualizar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div><h3>Insertar Personaje</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={dataState.length + 1}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Personaje:
            </label>
            <input
              className="form-control"
              name="personaje"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Anime:
            </label>
            <input
              className="form-control"
              name="anime"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={insertar}
          >
            Insertar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={cerrarModalInsertar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
