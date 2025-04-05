
import { db } from '@/lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

// This function can be used to seed the initial breeds data
export const seedBreeds = async () => {
  // First check if we already have breeds in the database
  const breedsSnapshot = await getDocs(collection(db, 'breeds'));
  
  if (breedsSnapshot.empty) {
    // If no breeds exist, seed the database with initial data
    const initialBreeds = [
      {
        name: "Orpingtons",
        description: "Known for their gentle nature and exceptional egg-laying capabilities, our Orpingtons are bred for both beauty and functionality."
      },
      {
        name: "Columbian Brahmas",
        description: "Majestic and imposing, Columbian Brahmas are gentle giants that make excellent winter layers and stunning show birds."
      },
      {
        name: "Frizzle Orpingtons",
        description: "These unique birds feature distinctively curled feathers, combining the beloved Orpington temperament with extraordinary appearance."
      },
      {
        name: "Plymouth Rocks",
        description: "A heritage breed known for their striking barred pattern and excellent dual-purpose characteristics."
      },
      {
        name: "Wyandottes",
        description: "Beautiful laced feathering combined with a friendly disposition makes these birds perfect for both show and practical purposes."
      },
      {
        name: "Sussex",
        description: "Calm and friendly birds that excel at both egg laying and meat production, perfect for small homesteads."
      }
    ];
    
    // Add each breed to Firestore
    for (const breed of initialBreeds) {
      await setDoc(doc(db, 'breeds', breed.name.toLowerCase().replace(/\s+/g, '-')), {
        name: breed.name,
        description: breed.description,
        createdAt: new Date().toISOString()
      });
    }
    
    console.log('Initial breeds data seeded successfully');
    return initialBreeds;
  }
  
  return breedsSnapshot.docs.map(doc => doc.data());
};
