import React, { useState } from "react";
import Logout from "./logout.component";
import axiosService from "../services/axios.service";

export default function Admin() {
    const [exercisename, setExercisename] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleAddExercise = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const formData = new FormData();
            formData.append("exercisename", exercisename);
            formData.append("description", description);
            formData.append("filename", file);

            const response = await axiosService.post("/exercises", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("Övning tillagd:", response.data);

            // Återställer tillståndsvariabler efter framgångsrikt postanrop
            setExercisename("");
            setDescription("");
            setFile(null);

            // Nollställer formuläret
            e.target.reset();

        } catch (error) {
            console.error("Felmeddelande:", error);
            setError(error.response?.data.message || "Ett fel uppstod vid tillägg av övning!");
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className="admin">
            <Logout />
            <h1>Administrera</h1>

            <form onSubmit={handleAddExercise}>
                <h2>Lägg till övning</h2>
                <label>
                    Namn:
                    <br />
                    <input
                        type="text"
                        value={exercisename}
                        onChange={(e) => setExercisename(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Beskrivning:
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Videofil:
                    <br />
                    <input type="file" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Spara</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}