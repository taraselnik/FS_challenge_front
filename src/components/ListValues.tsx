import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Value, Query } from "../types/type";

export const ListValues: React.FC = () => {
  const [values, setValue] = useState<Value[]>([]);
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getValues();
  }, []);

  const getValues = async () => {
    const response = await axios.get("http://taraselnik.eu-4.evennode.com/api");
    setValue(response.data);
    console.log(response.data);
  };

  const deleteAll = async () => {
    try {
      await axios.delete(`http://taraselnik.eu-4.evennode.com/api`);
      getValues();
    } catch (error) {
      console.log(error);
    }
  };

  const escFunction = useCallback((event: { key: string; }) => {
    if (event.key === "Escape") {
      setNumber('')
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const handleSubmit = (async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data: Query = { num: +number };
    try {
      setLoading(true);
      await axios.post(`http://taraselnik.eu-4.evennode.com/api`, data);
      getValues();
    } catch (error) {
      console.log(error);
    }
    setNumber('');
    setLoading(false);
  })

  return (
    <div className="columns mt-4">
      <div className="column is-half">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Number to evaluate</label>
            <div className="control">
              <input
                type="text"
                className="input"
                maxLength={8}
                value={number}
                pattern="[0-9]*"
                onChange={(e) => setNumber(e.target.value)}
                placeholder="write integer number here"
              />
              {loading ? <progress className="progress is-small is-primary" max="100">15%</progress>
              :<progress className="progress is-small is-primary" value={0} max="100">15%</progress>}
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-success inactive"
                disabled={!number}
                >
                Submit
              </button>
            </div>
          </div>
        </form>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Input</th>
              <th>First Median</th>
              <th>Second Median</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.num}</td>
                <td>{value.medianFirst}</td>
                <td>{value.medianSecond}</td>
                {/* <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                    >
                    Edit
                    </Link>
                    <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                    >
                    Delete
                    </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="button" onClick={() => deleteAll()}
          disabled={!values.length}
        >
          DELETE ALL
        </button>
      </div>
    </div>
  );
};
