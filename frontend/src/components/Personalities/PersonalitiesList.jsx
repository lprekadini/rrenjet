import React, { useEffect, useState } from 'react';
import { fetchPersonalities } from '../../services/api';

const PersonalitiesList = () => {
    const [personalities, setPersonalities] = useState([]);

    useEffect(() => {
        const getPersonalities = async () => {
            try {
                const response = await fetchPersonalities();
                setPersonalities(response.data);
            } catch (error) {
                console.error('❌ Gabim gjatë marrjes së personaliteteve:', error);
            }
        };

        getPersonalities();
    }, []);

    return (
        <div>
            <h2>Lista e Personaliteteve</h2>
            {personalities.length > 0 ? (
                <ul>
                    {personalities.map((personality) => (
                        <li key={personality.id}>
                            <h3>{personality.name}</h3>
                            <p dangerouslySetInnerHTML={{ __html: personality.biography }} />
                            {personality.image_url && (
                                <img 
                                    src={`http://localhost:5001/uploads/${personality.image_url}`} 
                                    alt={personality.name} 
                                    width="200"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results.</p>
            )}
        </div>
    );
};

export default PersonalitiesList;
