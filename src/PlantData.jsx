// PlantData.jsx
import img1 from './img1.jpg';
import img2 from './img2.jpg';  // Replace with the correct image import path
import img3 from './img3.jpg';  // Replace with the correct image import path
import img4 from './img4.jpg';  // Replace with the correct image import path
import img5 from './img5.jpg';  // Replace with the correct image import path
import img6 from './img6.jpg';

const plantData = [
  {
    id: "1",
    plant_name: "Apple",
    disease: "Apple rust leaf",
    scientific_name: "Gymnosporangium juniperinum",
    symptoms: ["Yellow-orange spots on leaves", "Rust-colored lesions on fruit", "Defoliation in severe cases"],
    pesticides: [
      { name: "Copper-based Fungicide", type: "Fungicide", application_method: "Spray", dosage: "3 g per liter of water" },
    ],
    natural_treatment: {
      urea_preparation: "Spray a 5% urea solution to break down infected material.",
      other_methods: ["Prune and dispose of infected branches.", "Avoid planting apple trees near cedar trees."],
    },
    preventive_measures: ["Apply fungicides before bud break.", "Use resistant apple varieties."],
    recommended_crop_rotation: ["Avoid planting apples near juniper trees."],
    image: img1,
  },
  {
    id: "2",
    plant_name: "Tomato",
    disease: "Target Spot",
    scientific_name: "Corynespora cassiicola",
    symptoms: [
      "Dark circular lesions with concentric rings on leaves",
      "Yellow halos surrounding lesions",
      "Defoliation in severe cases"
    ],
    pesticides: [
      { name: "Mancozeb", type: "Fungicide", application_method: "Spray", dosage: "2.5 g per liter of water" }
    ],
    natural_treatment: {
      urea_preparation: "Spray a 2% urea solution to prevent fungal growth.",
      other_methods: [
        "Remove and dispose of infected plant material.",
        "Apply neem oil as a preventive measure."
      ]
    },
    preventive_measures: [
      "Prune tomato plants for good air circulation.",
      "Use resistant tomato varieties."
    ],
    recommended_crop_rotation: ["Rotate tomatoes with crops like beans or cabbage."],
    image: img2,
  },
  {
    id: "3",
    plant_name: "Tomato",
    disease: "Tomato Leaf Mold",
    scientific_name: "Passalora fulva",
    symptoms: [
      "Yellow spots on upper leaf surface",
      "Greenish fuzzy growth on undersides of leaves",
      "Defoliation in severe cases"
    ],
    pesticides: [
      { name: "Mancozeb", type: "Fungicide", application_method: "Spray", dosage: "2.5 g per liter of water" }
    ],
    natural_treatment: {
      urea_preparation: "Spray a 2% urea solution on infected plants.",
      other_methods: [
        "Prune infected leaves and dispose of them properly.",
        "Increase airflow around plants by pruning and spacing them correctly."
      ]
    },
    preventive_measures: [
      "Prune for better air circulation.",
      "Use resistant tomato varieties.",
      "Avoid overhead watering.",
      "Ensure proper spacing between plants."
    ],
    recommended_crop_rotation: ["Rotate tomatoes with other crops like legumes (beans, peas)."],
    image: img3,
  },
  {
    id: "4",
    plant_name: "Corn",
    disease: "Corn Gray leaf spot",
    scientific_name: "Cercospora zeae-maydis",
    symptoms: [
      "Dark, rectangular lesions on leaves",
      "Grayish centers with yellow halos",
      "Defoliation in severe cases"
    ],
    pesticides: [
      { name: "Trifloxystrobin", type: "Fungicide", application_method: "Spray", dosage: "1.5 ml per liter of water" }
    ],
    natural_treatment: {
      urea_preparation: "Spray a 2% urea solution on affected areas.",
      other_methods: [
        "Prune infected leaves.",
        "Improve airflow through the crop."
      ]
    },
    preventive_measures: [
      "Use resistant varieties of corn.",
      "Rotate corn with non-grass crops."
    ],
    recommended_crop_rotation: ["Avoid planting corn after maize in the same area."],
    image: img4,
  },
  {
    id: "5",
    plant_name: "Orange",
    disease: "Huanglongbing (Citrus Greening)",
    scientific_name: "Candidatus Liberibacter asiaticus",
    symptoms: [
      "Yellowing of leaves on one side",
      "Small, misshapen fruit",
      "Tree decline and death in severe cases"
    ],
    pesticides: [],
    natural_treatment: {
      urea_preparation: "No natural treatments available for this disease.",
      other_methods: [
        "Control vector insects (e.g., psyllids).",
        "Remove infected trees to prevent spread."
      ]
    },
    preventive_measures: [
      "Plant disease-free citrus stock.",
      "Control insect vectors with insecticides."
    ],
    recommended_crop_rotation: ["Rotate citrus with non-host plants."],
    image: img5,
  },
  {
    id: "6",
    plant_name: "Tomato",
    disease: "Septoria Leaf Spot",
    scientific_name: "Septoria lycopersici",
    symptoms: [
      "Small, dark spots with pale centers on lower leaves",
      "Yellowing around lesions",
      "Defoliation in severe cases"
    ],
    pesticides: [
      { name: "Mancozeb", type: "Fungicide", application_method: "Spray", dosage: "2.5 g per liter of water" }
    ],
    natural_treatment: {
      urea_preparation: "Spray a 2% urea solution on infected areas.",
      other_methods: [
        "Remove and destroy infected leaves.",
        "Increase spacing between plants for better air circulation."
      ]
    },
    preventive_measures: [
      "Avoid overhead watering.",
      "Use disease-resistant tomato varieties."
    ],
    recommended_crop_rotation: ["Rotate tomatoes with other crops like legumes."],
    image: img6,
  }
];

export default plantData;