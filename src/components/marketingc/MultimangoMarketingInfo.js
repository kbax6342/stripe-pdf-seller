import React from 'react';

// Data structure for the two main marketing sections
const marketingData = [
  {
    title: 'Core Function: Multimodal Data Labeling',
    content: (
      <>
        Multimango is a system designed to help human labelers (annotators) take raw, unlabeled data and add specific, meaningful tags, boundaries, or descriptions.
        <br /><br />
        Every successful AI system, from self-driving cars to personalized recommendations, relies on high-quality, pre-labeled data. This labeled data serves as the training material that teaches a machine learning model what to look for and how to interpret the world. Multimango sits at the heart of this process:
      </>
    ),
    points: [
      {
        heading: '',
        text: '',
      },
    ],
  },
  {
    title: 'Handling Multimodal Complexity',
    content: (
      <>
        The term "Multimango" emphasizes its strength in **multimodal annotation**. Modern AI systems often require inputs from multiple sensors or data streams to make decisions.
      </>
    ),
    points: [
      {
        heading: 'Example: Autonomous Vehicle Perception',
        text: 'A self-driving car doesn\'t just look at an image (visual data); it processes the distance to objects (LiDAR data), the velocity of movement (sensor data), and emergency vehicle sirens (audio data). Multimango allows annotators to link, synchronize, and label these diverse data types within one unified workspace, ensuring the AI model learns holistic context, not just isolated facts.',
      },
    ],
  },
];

// Component for the individual marketing section (the "cards")
const MarketingCard = ({ title, content, points }) => (
  <div style={styles.card}>
    <h3 style={styles.title}>{title}</h3>
    <div style={styles.content}>{content}</div>
    {points.map((point, index) => (
      <div key={index} style={styles.pointContainer}>
        <h4 style={styles.pointHeading}>{point.heading}</h4>
        <p style={styles.pointText}>{point.text}</p>
      </div>
    ))}
  </div>
);

// Main Component
const MultimangoMarketingInfo = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeading}>🥭 What is Multimango Annotation AI?</h2>
      <p style={styles.subHeading}>
        Its core purpose is to facilitate the creation of high-quality, labeled data necessary for training machine learning (ML) models, particularly those involved in multimodal tasks.
      </p>

      <div style={styles.cardContainer}>
        {marketingData.map((section, index) => (
          <MarketingCard key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

// Simple inline styles to meet the requirements (no borders, no rounded corners)
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  mainHeading: {
    textAlign: 'center',
    color: '#004d40', // Dark green color
    marginBottom: '10px',
  },
  subHeading: {
    textAlign: 'center',
    color: '',
    fontSize: '1 em',
    marginBottom: '40px',
  },
  cardContainer: {
    display: 'flex',
    gap: '30px', // Space between the two "cards"
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    // This div acts as the "card" container, but is styled as a simple block
    flex: '1 1 45%', // Allows the cards to take up slightly less than half the width
    minWidth: '300px',
    padding: '20px',
    backgroundColor: '#f9f9f9', // Light background to visually separate the content
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Subtle shadow for visual lift without a hard border
    // **CRITICAL STYLING FOR REQUIREMENTS:**
    border: 'none', // Ensures no border
    borderRadius: '0', // Ensures no rounded corners
  },
  title: {
    color: '#004d40',
    borderBottom: '2px solid #e0e0e0', // Simple divider instead of a box border
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  content: {
    marginBottom: '20px',
    lineHeight: '1.6',
    color: '#555',
  },
  pointContainer: {
    marginTop: '15px',
    paddingLeft: '10px',
    borderLeft: '3px solid #66bb6a', // Green line to highlight key points
  },
  pointHeading: {
    color: '#333',
    fontSize: '1em',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  pointText: {
    fontSize: '0.95em',
    lineHeight: '1.5',
    color: '#555',
  },
};

export default MultimangoMarketingInfo;