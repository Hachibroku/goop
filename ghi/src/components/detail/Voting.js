// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// // import "./Voting.css";

// function Voting({ currentUser }) {
//     const [votes, setVotes] = useState([]);
//     const { topicId } = useParams();

//     useEffect(() => {
//         async function fetchVotes() {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8000/api/votes?topic_id=${topicId}`
//                 );
//                 //could be wrong 
//                 setVotes(response.data.votes); 
//             } catch (error) {
//                 console.error("Failed to fetch votes:", error);
//             }
//         }

//         fetchVotes();
//     }, [topicId]);

//     const handlePostVote = async (voteType) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:8000/api/topics/${topicId}/vote`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         username: currentUser,
//                         vote_type: voteType,
//                     }),
//                 }
//             );

//             if (response.ok) {
//                 const updatedVotes = [
//                     ...votes,
//                     { username: currentUser, vote_type: voteType },
//                 ];
//                 setVotes(updatedVotes);
//             } else {
//                 console.error("Failed to post vote");
//             }
//         } catch (error) {
//             console.error("There was an error posting the vote", error);
//         }
//     };

//     return (
//         <div className="voting-section">
//             <div className="new-vote">
//                 <h2>Cast Your Vote</h2>
//                 <button onClick={() => handlePostVote("upvote")}>Upvote</button>
//                 <button onClick={() => handlePostVote("downvote")}>Downvote</button>
//             </div>

//             <div className="existing-votes">
//                 <h2>Votes</h2>
//                 {votes.map((vote, index) => (
//                     <div key={index} className="single-vote">
//                         <h3>{vote.username}</h3>
//                         <p>{vote.vote_type}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Voting;