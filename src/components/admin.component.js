import React, { useState, useEffect } from "react";
import Logout from "./logout.component";
import axiosService from "../services/axios.service";

// Exporterar admin-komponent
export default function Admin() {

    // Skapar tillståndsvariabler och funktioner för att uppdatera deras värden
    const [exercisename, setExercisename] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [addError, setAddError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [editingExercisename, setEditingExercisename] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [successRegisterMessage, setSuccessRegisterMessage] = useState("");

    // Använder react-hook för att anropa funktion när komponenten renderas
    useEffect(() => {
        getExercises();
    }, []);

    // Funktion som anropas vid klick på knapp för att spara en övning
    const handleAddExercise = async (e) => {

        // Förhindrar att data skickas och att sidan laddar om när formuläret skickas
        e.preventDefault();

        try {
            // Återställer felmeddelande
            setAddError("");

            // Skapar FormData-instans för att hantera multipart/form-data med filuppladdning
            const formData = new FormData();
            formData.append("exercisename", exercisename);
            formData.append("description", description);
            formData.append("filename", file);

            // Utför post-anrop och skickar med formulärdata samt särskild header-information
            const response = await axiosService.post("/exercises", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            // Loggar svaret från servern
            console.log("Övning tillagd:", response.data);

            // Återställer tillståndsvariabler efter framgångsrikt post-anrop
            setExercisename("");
            setDescription("");
            setFile(null);

            // Nollställer formuläret
            e.target.reset();

            // Anropar funktion för att hämta övningar
            getExercises();

            // Sätter ett bekräftelse-meddelande
            setSuccessMessage("Övningen har lagts till!");

            // Tar bort meddelandet efter 5 sekunder
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

        } catch (error) {

            // Loggar felmeddelande
            console.error("Felmeddelande:", error);

            // Visar felmeddelande för användaren
            setAddError(error.response?.data.message || "Ett fel uppstod vid tillägg av övning!");

            // Tar bort felmeddelandet efter 5 sekunder
            setTimeout(() => {
                setAddError("");
            }, 5000);
        }
    }

    // Uppdaterar tillståndsvariabel när användaren väljer en fil för uppladdning
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    // Hämtar övningar från servern och uppdaterar tillståndsvariabeln som lagrar övningarna
    const getExercises = async () => {
        try {
            const response = await axiosService.get("/exercises");
            setExercises(response.data);
        } catch (error) {
            console.error("Felmeddelande:", error);
        }
    }

    // Funktion som anropas vid klick på knapp för att spara en redigerad övning
    const handleUpdateExercise = async () => {
        try {
            // Återställer felmeddelande
            setUpdateError("");

            // Skapar en objektstruktur med uppdateringsdata
            const updateData = {
                exercisename: editingExercisename,
                description: editingDescription
            }

            // Utför put-anrop och skickar med uppdateringsdata för att uppdatera vald övning
            const response = await axiosService.put("/exercises/" + selectedExercise._id, updateData);

            // Loggar svaret från servern
            console.log("Övning uppdaterad:", response.data);

            // Återställer tillståndsvariabler efter framgångsrikt put-anrop
            setEditingExercisename("");
            setEditingDescription("");
            setSelectedExercise(null);

            // Anropar funktion för att hämta övningar
            getExercises();

        } catch (error) {

            // Loggar felmeddelande
            console.error("Felmeddelande:", error);

            // Visar felmeddelande för användaren
            setUpdateError(error.response?.data.message || "Ett fel uppstod vid uppdatering av övning!");

            // Tar bort meddelandet efter 5 sekunder
            setTimeout(() => {
                setUpdateError("");
            }, 5000);
        }
    }

    // Markerar en övning för redigering och uppdaterar redigeringsformulärets tillståndsvariabler
    const handleSelectExercise = (exercise) => {
        setEditingExercisename(exercise.exercisename);
        setEditingDescription(exercise.description);
        setSelectedExercise(exercise);
    }

    // Avbryter redigeringsläge och återställer tillståndsvariabler
    const handleCancelEdit = () => {
        setEditingExercisename("");
        setEditingDescription("");
        setSelectedExercise(null);
    }

    // Funktion som anropas vid klick på knapp för att radera en specifik övning
    const handleDeleteExercise = async (exerciseId) => {
        try {

            // Återställer felmeddelande
            setDeleteError("");

            // Låter användaren bekräfta att övningen ska raderas
            const userConfirmed = window.confirm("Är du säker på att du vill radera övningen?");
            if (userConfirmed) {

                // Utför delete-anrop för vald övning
                const response = await axiosService.delete("/exercises/" + exerciseId);

                // Loggar svaret från servern
                console.log("Övning raderad:", response.data);

                // Anropar funktion för att hämta övningar
                getExercises();
            }
        } catch (error) {

            // Loggar felmeddelande
            console.error("Felmeddelande:", error);

            // Visar felmeddelande för användaren
            setDeleteError(error.response?.data.message || "Ett fel uppstod vid radering av övning!");
        }
    }

    // Funktion som anropas vid klick på knapp för att registrera en administratör
    const handleRegisterUser = async (e) => {

        // Förhindrar att data skickas och att sidan laddar om när formuläret skickas
        e.preventDefault();

        try {
            // Återställer felmeddelande
            setRegisterError("");

            // Skapar en objektstruktur med administratörsdata
            const adminData = {
                username: username,
                password: password
            }

            // Utför post-anrop och skickar med administratörsdata
            const response = await axiosService.post("/register", adminData);

            // Loggar svaret från servern
            console.log("Administratör tillagd:", response.data);

            // Återställer tillståndsvariabler efter framgångsrikt post-anrop
            setUsername("");
            setPassword("");

            // Nollställer formuläret
            e.target.reset();

            // Sätter ett bekräftelse-meddelande
            setSuccessRegisterMessage("Administratör har lagts till!");

            // Tar bort meddelandet efter 5 sekunder
            setTimeout(() => {
                setSuccessRegisterMessage("");
            }, 5000);

        } catch (error) {

            // Loggar felmeddelande
            console.error("Felmeddelande:", error);

            // Visar felmeddelande för användaren om inloggning misslyckas
            setRegisterError(error.response?.data.message || "Ett fel uppstod vid registrering!");

            // Tar bort felmeddelandet efter 5 sekunder
            setTimeout(() => {
                setRegisterError("");
            }, 5000);
        }
    }

    // Renderar användargränssnitt med formulär, utskrift av övningar, visning av eventuella felmeddelanden m.m.
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
                <button type="submit">Lägg till<i className="fa-solid fa-plus"></i></button>
            </form>
            {addError && <p style={{ color: "red" }}>{addError}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <h2>Befintliga övningar</h2>
            {exercises.map((exercise) => (
                <div key={exercise._id}>
                    {selectedExercise === exercise ? (
                        <>
                            <h3>Redigera övning</h3>
                            <label>
                                Namn:
                                <br />
                                <input
                                    type="text"
                                    value={editingExercisename}
                                    onChange={(e) => setEditingExercisename(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Beskrivning:
                                <br />
                                <textarea
                                    value={editingDescription}
                                    onChange={(e) => setEditingDescription(e.target.value)}
                                />
                            </label>
                            <br />
                            {updateError && <p style={{ color: "red" }}>{updateError}</p>}
                            <button onClick={handleUpdateExercise}>Spara<i className="fa-solid fa-arrows-rotate"></i></button>
                            <button onClick={handleCancelEdit}>Avbryt</button>
                        </>
                    ) : (
                        <>
                            <h3>{exercise.exercisename}</h3>
                            <p>{exercise.description}</p>
                            <video src={`http://localhost:3050/uploads/${exercise.filename}`} width={100} controls>
                                Din webbläsare kan inte visa videon...
                            </video>
                            <br />
                            <button onClick={() => handleSelectExercise(exercise)}>Redigera<i className="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={() => handleDeleteExercise(exercise._id)}>Radera<i className="fa-solid fa-trash-can"></i></button>
                            {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
                        </>
                    )}
                </div>
            ))}
            <h2>Lägg till administratör</h2>
            <form onSubmit={handleRegisterUser}>
                <label>
                    Användarnamn:
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Lösenord:
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Lägg till<i className="fa-solid fa-plus"></i></button>
                {registerError && <p style={{ color: "red" }}>{registerError}</p>}
                {successRegisterMessage && <p style={{ color: "green" }}>{successRegisterMessage}</p>}
            </form>
        </div>
    );
}