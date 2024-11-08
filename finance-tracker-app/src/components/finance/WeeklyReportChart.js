import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyReportChart = ({ userId }) => {
    const [data, setData] = useState([]);

    // Define a color map for each category
    const categoryColors = {
        Food: '#FF5733',  // Red for Food
        Transportation: '#33FF57',  // Green for Transportation
        Entertainment: '#3357FF',  // Blue for Entertainment
        Shopping: '#FF33A6',  // Pink for Shopping
        Other: '#FFC300',  // Yellow for Other
    };

    useEffect(() => {
        // Fetch weekly report data using axios
        axios.get(`http://localhost:8080/expense/weekly-report/${userId}`)
            .then(response => {
                const data = response.data;  // Axios automatically parses the JSON response

                // Format the data into an array of objects with category and amount
                const formattedData = Object.keys(data).map(category => ({
                    category: category,  // Set the category name as the key
                    amount: data[category],  // Set the amount for the category
                    color: categoryColors[category] || '#808080',  // Use color from categoryColors map, default to gray
                }));

                // Update the state with formatted data
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching weekly report:', error);
            });
    }, [userId]);  // Dependency array: only run the effect when userId changes


    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.map((entry, index) => (
                        <Bar
                            key={index}
                            dataKey={entry.category}
                            fill={entry.color}  // Use the dynamically assigned color for each category
                        />
                    ))} 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyReportChart;
