function openTab(tabName) { 
  let tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }
  
  let tabButtons = document.getElementsByClassName('tab-btn');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }
  
  document.getElementById(tabName).classList.add('active');
  
  event.currentTarget.classList.add('active');
}

const jeansImages = {
  'Skinny Jeans': 'https://m.media-amazon.com/images/I/81+PoprbPzL._AC_UY350_.jpg',
  'Straight Jeans': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
  'Bootcut Jeans': 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk781APbChftF9kNM34PpXRGem-v57C-bs-FCVXsxvJNl7tpJnB1ORi2c06PB6UfDY1c33pbW5H5pv85wgtCsSfncLXjlZb9iec9UIa57RUjZMSb0g6E9HHg',
  'Wide Leg Jeans': 'https://images.meesho.com/images/products/472525455/47mt1_512.webp',
  'Relaxed Fit Jeans': 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27684026/2024/9/6/626b0449-2106-4b90-9155-8889c50860b31725606997433-Urbano-Fashion-Men-Loose-Fit-Non-Stretchable-Cargo-Jeans-132-6.jpg',
  'Tapered Jeans': 'https://assets.ajio.com/medias/sys_master/root/20240513/hQnE/6641410e05ac7d77bb548287/-473Wx593H-467324135-aqua-MODEL2.jpg',
  'Premium Straight Jeans': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
  'Designer Straight Cut': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
  'High-Waisted Jeans': 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27684026/2024/9/6/626b0449-2106-4b90-9155-8889c50860b31725606997433-Urbano-Fashion-Men-Loose-Fit-Non-Stretchable-Cargo-Jeans-132-6.jpg',
  'Flare Jeans': 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk781APbChftF9kNM34PpXRGem-v57C-bs-FCVXsxvJNl7tpJnB1ORi2c06PB6UfDY1c33pbW5H5pv85wgtCsSfncLXjlZb9iec9UIa57RUjZMSb0g6E9HHg'
};

function getJeansImage(jeansName) {
  return jeansImages[jeansName] || '/api/placeholder/250/300';
}

function previewImage(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    
    reader.onload = function(e) {
      let preview = document.getElementById('preview-image');
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

function handleFileDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  
  document.querySelector('.upload-area').classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  
  if (files.length > 0) {
    const fileInput = document.getElementById('photo-upload');
    fileInput.files = files;
    
    previewImage(fileInput);
  }
}

function analyzePhoto() {
  let preview = document.getElementById('preview-image');
  
  if (preview.style.display === 'none' || preview.style.display === '') {
    showToast('Please upload a photo first');
    return;
  }
  
  document.getElementById('progressBar').style.width = '0%';
  showToast('Analyzing your photo...');
  
  let progress = 0;
  let progressInterval = setInterval(function() {
    progress += 10;
    document.getElementById('progressBar').style.width = progress + '%';
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      setTimeout(function() {
        document.getElementById('progressBar').style.width = '0%';
        showResults('Bootcut Jeans', 'The bootcut style will balance your proportions and create a flattering silhouette for your body shape.');
      }, 500);
    }
  }, 200);
}

function processQuiz() {
  const bodyShape = document.getElementById('body-shape').value;
  const height = document.getElementById('height').value;
  const stylePref = document.getElementById('style-pref').value;
  const waistPref = document.getElementById('waist-preference').value;
  const styleVibe = document.getElementById('style-vibe').value;
  
  if (!bodyShape || !height || !stylePref || !waistPref || !styleVibe) {
    alert('Please complete all questions');
    return;
  }
  
  document.getElementById('progressBar').style.width = '0%';
  showToast('Processing your answers...');
  
  let progress = 0;
  let progressInterval = setInterval(function() {
    progress += 20;
    document.getElementById('progressBar').style.width = progress + '%';
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      let recommendation, description;
      
      if (bodyShape === 'hourglass') {
        if (stylePref === 'fitted') {
          recommendation = 'Skinny Jeans';
          description = 'These will highlight your defined waist and balanced proportions.';
        } else {
          recommendation = 'Straight Jeans';
          description = 'This classic style will maintain your balanced silhouette while providing more comfort.';
        }
      } else if (bodyShape === 'pear') {
        if (stylePref === 'fitted') {
          recommendation = 'Bootcut Jeans';
          description = 'The slight flare balances wider hips and creates a harmonious silhouette.';
        } else {
          recommendation = 'Wide Leg Jeans';
          description = 'The wide leg creates balance throughout your silhouette, flattering your hips.';
        }
      } else if (bodyShape === 'apple') {
        recommendation = 'Relaxed Fit Jeans';
        description = 'These provide comfort around the midsection while creating a sleek line.';
      } else if (bodyShape === 'rectangle') {
        if (waistPref === 'high') {
          recommendation = 'High-Waisted Jeans';
          description = 'These will create the illusion of curves and define your waist.';
        } else {
          recommendation = 'Tapered Jeans';
          description = 'This relaxed style adds dimension to your frame while maintaining comfort.';
        }
      } else {
        recommendation = 'Straight Jeans';
        description = 'This versatile style works well for your body type and provides balance.';
      }
      
      setTimeout(function() {
        document.getElementById('progressBar').style.width = '0%';
        showResults(recommendation, description);
      }, 500);
    }
  }, 200);
}

function showResults(recommendation, description) {
  document.getElementById('recommendation-title').textContent = recommendation;
  document.getElementById('recommendation-desc').textContent = description;
  
  let recommendationCards = document.querySelectorAll('.recommendations .jeans-card');
  if (recommendationCards.length >= 1) {
    let img = recommendationCards[0].querySelector('img');
    img.src = getJeansImage(recommendation);
    img.alt = recommendation;
    
    recommendationCards[0].querySelector('.jeans-title').textContent = "Premium " + recommendation.replace(' Jeans', '');
  }
  
  if (recommendationCards.length >= 2) {
    let img = recommendationCards[1].querySelector('img');
    img.src = getJeansImage(recommendation);
    img.alt = "Designer " + recommendation;
  }
  
  document.getElementById('results').classList.add('active');
  document.getElementById('methods').scrollIntoView({behavior: 'smooth'});
}

function resetRecommendation() {
  document.getElementById('results').classList.remove('active');
  document.getElementById('style-quiz-form').reset();
  document.getElementById('preview-image').style.display = 'none';
}

function openStyleTips(style) {
  let modal = document.getElementById('styleTipsModal');
  let styleNameElement = document.getElementById('jeans-style-name');
  let styleContent = document.getElementById('styleTipsContent');
  
  styleNameElement.textContent = style.charAt(0).toUpperCase() + style.slice(1) + ' Jeans';
  
  let tipsList = '';
  
  if (style === 'skinny') {
    tipsList = `
      <li>Choose a mid or high-rise for the most flattering look.</li>
      <li>Pair with longer tops that cover your hips if you're concerned about that area.</li>
      <li>Balance the slim silhouette with voluminous tops or oversized sweaters.</li>
      <li>For petite frames, look for cropped styles that hit right at the ankle.</li>
    `;
  } else if (style === 'straight') {
    tipsList = `
      <li>High-waisted straight jeans elongate the legs and define the waist.</li>
      <li>Classic medium wash is the most versatile for everyday wear.</li>
      <li>Pair with ankle boots or heels to enhance the leg-lengthening effect.</li>
      <li>Cuff them for a casual look or to show off statement shoes.</li>
    `;
  } else if (style === 'bootcut') {
    tipsList = `
      <li>Wear with heels or boots to maintain the length and proportion.</li>
      <li>Choose a rise that sits at your natural waist for balance.</li>
      <li>Great for creating balance for pear-shaped bodies.</li>
      <li>Look for stretch denim for added comfort while maintaining shape.</li>
    `;
  } else if (style === 'wide-leg') {
    tipsList = `
      <li>High-waisted styles work best to define your shape.</li>
      <li>Pair with fitted tops to balance the volume on bottom.</li>
      <li>Choose the right length - they should just graze the floor when wearing shoes.</li>
      <li>Solid, dark washes create a more sophisticated look.</li>
    `;
  } else if (style === 'high-waisted') {
    tipsList = `
      <li>Tuck in your top to highlight the high waist and create definition.</li>
      <li>Roll the cuffs for a more modern look.</li>
      <li>Pair with sneakers for casual cool or heels to dress them up.</li>
      <li>Choose a tapered leg to avoid looking too boxy.</li>
    `;
  } else if (style === 'flare') {
    tipsList = `
      <li>Wear with platform shoes or heels to maintain the dramatic length.</li>
      <li>High-waisted styles create the most flattering silhouette.</li>
      <li>Pair with fitted or cropped tops to balance the volume.</li>
      <li>Darker washes create a sleek, elongated look.</li>
    `;
  } else if (style === 'relaxed') {
    tipsList = `
      <li>Keep the top more fitted to balance the relaxed bottom.</li>
      <li>Cuff the hem for a more casual, styled look.</li>
      <li>Choose a mid-rise for the most versatile fit.</li>
      <li>Dark washes help create a more polished appearance.</li>
    `;
  } else if (style === 'tapered') {
    tipsList = `
      <li>Great for showing off shoes while maintaining a clean silhouette.</li>
      <li>Works well with both casual and dressier tops.</li>
      <li>Higher rise options help define the waist.</li>
      <li>Choose a slight stretch for the most comfortable fit.</li>
    `;
  }
  
  document.querySelector('.style-tips-list').innerHTML = tipsList;
  
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('styleTipsModal').classList.remove('active');
}

function toggleFavorite(button, jeansName) {
  button.classList.toggle('active');
  
  let favorites = JSON.parse(localStorage.getItem('jeansFavorites')) || [];
  
  if (button.classList.contains('active')) {
    if (!favorites.includes(jeansName)) {
      favorites.push(jeansName);
      showToast('Added to favorites');
    }
  } else {
    let index = favorites.indexOf(jeansName);
    if (index > -1) {
      favorites.splice(index, 1);
      showToast('Removed from favorites');
    }
  }
  
  localStorage.setItem('jeansFavorites', JSON.stringify(favorites));
  
  updateFavoritesDisplay();
}

function updateFavoritesDisplay() {
  let favorites = JSON.parse(localStorage.getItem('jeansFavorites')) || [];
  let favoritesContainer = document.getElementById('favorites-container');
  
  favoritesContainer.innerHTML = '';
  
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p class="no-favorites">You have no favorites yet. Click the heart icon to add jeans to your favorites.</p>';
    return;
  }
  
  favorites.forEach(jeansName => {
    let favoriteCard = document.createElement('div');
    favoriteCard.className = 'jeans-card';
    
    let favoriteImg = document.createElement('img');
    favoriteImg.src = getJeansImage(jeansName);
    favoriteImg.alt = jeansName;
    
    let favoriteInfo = document.createElement('div');
    favoriteInfo.className = 'jeans-info';
    
    let favoriteTitle = document.createElement('h3');
    favoriteTitle.className = 'jeans-title';
    favoriteTitle.textContent = jeansName;
    
    let favoriteActions = document.createElement('div');
    favoriteActions.className = 'jeans-actions';
    
    let favoriteButton = document.createElement('button');
    favoriteButton.className = 'favorite-btn active';
    favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
    favoriteButton.onclick = function() { toggleFavorite(this, jeansName); };
    
    let tipsButton = document.createElement('button');
    tipsButton.className = 'tips-btn';
    tipsButton.innerHTML = '<i class="fas fa-info-circle"></i> Style Tips';
    tipsButton.onclick = function() { openStyleTips(jeansName.toLowerCase().replace(' jeans', '')); };
    
    favoriteActions.appendChild(favoriteButton);
    favoriteActions.appendChild(tipsButton);
    
    favoriteInfo.appendChild(favoriteTitle);
    favoriteInfo.appendChild(favoriteActions);
    
    favoriteCard.appendChild(favoriteImg);
    favoriteCard.appendChild(favoriteInfo);
    
    favoritesContainer.appendChild(favoriteCard);
  });
  
  let favoritesTabBtn = document.querySelector('.tab-btn[onclick="openTab(\'favorites-tab\')"]');
  if (favoritesTabBtn) {
    let favCount = document.createElement('span');
    favCount.className = 'fav-count';
    favCount.textContent = favorites.length;
    
    let existingCount = favoritesTabBtn.querySelector('.fav-count');
    if (existingCount) {
      favoritesTabBtn.removeChild(existingCount);
    }
    
    favoritesTabBtn.appendChild(favCount);
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

function initDragAndDrop() {
  const uploadArea = document.querySelector('.upload-area');
  if (!uploadArea) return;
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });
  
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });
  
  uploadArea.addEventListener('drop', handleFileDrop, false);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  document.querySelector('.upload-area').classList.add('dragover');
}

function unhighlight() {
  document.querySelector('.upload-area').classList.remove('dragover');
}

document.addEventListener('DOMContentLoaded', function() {
  let firstTabBtn = document.querySelector('.tab-btn');
  if (firstTabBtn) {
    firstTabBtn.click();
  }
  
  updateFavoritesDisplay();
  
  initDragAndDrop();
  
  let quizForm = document.getElementById('style-quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
      e.preventDefault();
      processQuiz();
    });
  }
});







































// // Function to handle tab switching
// function openTab(tabName) {
//   // Hide all tab contents
//   let tabContents = document.getElementsByClassName('tab-content');
//   for (let i = 0; i < tabContents.length; i++) {
//     tabContents[i].classList.remove('active');
//   }
  
//   // Deactivate all tab buttons
//   let tabButtons = document.getElementsByClassName('tab-btn');
//   for (let i = 0; i < tabButtons.length; i++) {
//     tabButtons[i].classList.remove('active');
//   }
  
//   // Show the selected tab content
//   document.getElementById(tabName).classList.add('active');
  
//   // Activate the clicked tab button
//   event.currentTarget.classList.add('active');
// }

// // Jeans image mapping
// const jeansImages = {
//   'Skinny Jeans': 'https://m.media-amazon.com/images/I/81+PoprbPzL._AC_UY350_.jpg',
//   'Straight Jeans': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
//   'Bootcut Jeans': 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk781APbChftF9kNM34PpXRGem-v57C-bs-FCVXsxvJNl7tpJnB1ORi2c06PB6UfDY1c33pbW5H5pv85wgtCsSfncLXjlZb9iec9UIa57RUjZMSb0g6E9HHg',
//   'Wide Leg Jeans': 'https://images.meesho.com/images/products/472525455/47mt1_512.webp',
//   'Relaxed Fit Jeans': 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27684026/2024/9/6/626b0449-2106-4b90-9155-8889c50860b31725606997433-Urbano-Fashion-Men-Loose-Fit-Non-Stretchable-Cargo-Jeans-132-6.jpg',
//   'Tapered Jeans': 'https://assets.ajio.com/medias/sys_master/root/20240513/hQnE/6641410e05ac7d77bb548287/-473Wx593H-467324135-aqua-MODEL2.jpg',
//   'Premium Straight Jeans': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
//   'Designer Straight Cut': 'https://assets.ajio.com/medias/sys_master/root/20230913/2m8u/6500c567ddf7791519d31619/-473Wx593H-466569239-blue-MODEL.jpg',
//   'High-Waisted Jeans': 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27684026/2024/9/6/626b0449-2106-4b90-9155-8889c50860b31725606997433-Urbano-Fashion-Men-Loose-Fit-Non-Stretchable-Cargo-Jeans-132-6.jpg',
//   'Flare Jeans': 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRk781APbChftF9kNM34PpXRGem-v57C-bs-FCVXsxvJNl7tpJnB1ORi2c06PB6UfDY1c33pbW5H5pv85wgtCsSfncLXjlZb9iec9UIa57RUjZMSb0g6E9HHg'
// };

// // Function to get image URL for a jeans type
// function getJeansImage(jeansName) {
//   return jeansImages[jeansName] || '/api/placeholder/250/300';
// }

// // Function to preview the uploaded image
// function previewImage(input) {
//   if (input.files && input.files[0]) {
//     let reader = new FileReader();
    
//     reader.onload = function(e) {
//       let preview = document.getElementById('preview-image');
//       preview.src = e.target.result;
//       preview.style.display = 'block';
//     }
    
//     reader.readAsDataURL(input.files[0]);
//   }
// }

// // Function to simulate photo analysis
// function analyzePhoto() {
//   let preview = document.getElementById('preview-image');
  
//   if (preview.style.display === 'none' || preview.style.display === '') {
//     showToast('Please upload a photo first');
//     return;
//   }
  
//   // Show loading state
//   document.getElementById('progressBar').style.width = '0%';
//   showToast('Analyzing your photo...');
  
//   // Simulate progress
//   let progress = 0;
//   let progressInterval = setInterval(function() {
//     progress += 10;
//     document.getElementById('progressBar').style.width = progress + '%';
    
//     if (progress >= 100) {
//       clearInterval(progressInterval);
      
//       // Show results after "analysis" is complete
//       setTimeout(function() {
//         document.getElementById('progressBar').style.width = '0%';
//         showResults('Bootcut Jeans', 'The bootcut style will balance your proportions and create a flattering silhouette for your body shape.');
//       }, 500);
//     }
//   }, 200);
// }

// // Function to process quiz answers
// function processQuiz() {
//   // Get all the form values
//   const bodyShape = document.getElementById('body-shape').value;
//   const height = document.getElementById('height').value;
//   const stylePref = document.getElementById('style-pref').value;
//   const waistPref = document.getElementById('waist-preference').value;
//   const styleVibe = document.getElementById('style-vibe').value;
  
//   // Validate the form
//   if (!bodyShape || !height || !stylePref || !waistPref || !styleVibe) {
//     alert('Please complete all questions');
//     return;
//   }
  
//   // Show loading state
//   document.getElementById('progressBar').style.width = '0%';
//   showToast('Processing your answers...');
  
//   // Simulate progress
//   let progress = 0;
//   let progressInterval = setInterval(function() {
//     progress += 20;
//     document.getElementById('progressBar').style.width = progress + '%';
    
//     if (progress >= 100) {
//       clearInterval(progressInterval);
      
//       // Determine recommendation based on inputs
//       let recommendation, description;
      
//       // Improved logic for recommendations
//       if (bodyShape === 'hourglass') {
//         if (stylePref === 'fitted') {
//           recommendation = 'Skinny Jeans';
//           description = 'These will highlight your defined waist and balanced proportions.';
//         } else {
//           recommendation = 'Straight Jeans';
//           description = 'This classic style will maintain your balanced silhouette while providing more comfort.';
//         }
//       } else if (bodyShape === 'pear') {
//         if (stylePref === 'fitted') {
//           recommendation = 'Bootcut Jeans';
//           description = 'The slight flare balances wider hips and creates a harmonious silhouette.';
//         } else {
//           recommendation = 'Wide Leg Jeans';
//           description = 'The wide leg creates balance throughout your silhouette, flattering your hips.';
//         }
//       } else if (bodyShape === 'apple') {
//         recommendation = 'Relaxed Fit Jeans';
//         description = 'These provide comfort around the midsection while creating a sleek line.';
//       } else if (bodyShape === 'rectangle') {
//         if (waistPref === 'high') {
//           recommendation = 'High-Waisted Jeans';
//           description = 'These will create the illusion of curves and define your waist.';
//         } else {
//           recommendation = 'Tapered Jeans';
//           description = 'This relaxed style adds dimension to your frame while maintaining comfort.';
//         }
//       } else {
//         recommendation = 'Straight Jeans';
//         description = 'This versatile style works well for your body type and provides balance.';
//       }
      
//       // Show results after "processing" is complete
//       setTimeout(function() {
//         document.getElementById('progressBar').style.width = '0%';
//         showResults(recommendation, description);
//       }, 500);
//     }
//   }, 200);
// }

// // Function to show results
// function showResults(recommendation, description) {
//   document.getElementById('recommendation-title').textContent = recommendation;
//   document.getElementById('recommendation-desc').textContent = description;
  
//   // Update the recommendation cards with proper images
//   let recommendationCards = document.querySelectorAll('.recommendations .jeans-card');
//   if (recommendationCards.length >= 1) {
//     let img = recommendationCards[0].querySelector('img');
//     img.src = getJeansImage(recommendation);
//     img.alt = recommendation;
    
//     // Update the first card title to match the recommendation
//     recommendationCards[0].querySelector('.jeans-title').textContent = "Premium " + recommendation.replace(' Jeans', '');
//   }
  
//   if (recommendationCards.length >= 2) {
//     let img = recommendationCards[1].querySelector('img');
//     img.src = getJeansImage(recommendation);
//     img.alt = "Designer " + recommendation;
//   }
  
//   document.getElementById('results').classList.add('active');
//   document.getElementById('methods').scrollIntoView({behavior: 'smooth'});
// }

// // Function to reset recommendation
// function resetRecommendation() {
//   document.getElementById('results').classList.remove('active');
//   document.getElementById('style-quiz-form').reset();
//   document.getElementById('preview-image').style.display = 'none';
// }

// // Function to open style tips modal
// function openStyleTips(style) {
//   let modal = document.getElementById('styleTipsModal');
//   let styleNameElement = document.getElementById('jeans-style-name');
//   let styleContent = document.getElementById('styleTipsContent');
  
//   // Set style name
//   styleNameElement.textContent = style.charAt(0).toUpperCase() + style.slice(1) + ' Jeans';
  
//   // Update content based on style
//   let tipsList = '';
  
//   if (style === 'skinny') {
//     tipsList = `
//       <li>Choose a mid or high-rise for the most flattering look.</li>
//       <li>Pair with longer tops that cover your hips if you're concerned about that area.</li>
//       <li>Balance the slim silhouette with voluminous tops or oversized sweaters.</li>
//       <li>For petite frames, look for cropped styles that hit right at the ankle.</li>
//     `;
//   } else if (style === 'straight') {
//     tipsList = `
//       <li>High-waisted straight jeans elongate the legs and define the waist.</li>
//       <li>Classic medium wash is the most versatile for everyday wear.</li>
//       <li>Pair with ankle boots or heels to enhance the leg-lengthening effect.</li>
//       <li>Cuff them for a casual look or to show off statement shoes.</li>
//     `;
//   } else if (style === 'bootcut') {
//     tipsList = `
//       <li>Wear with heels or boots to maintain the length and proportion.</li>
//       <li>Choose a rise that sits at your natural waist for balance.</li>
//       <li>Great for creating balance for pear-shaped bodies.</li>
//       <li>Look for stretch denim for added comfort while maintaining shape.</li>
//     `;
//   } else if (style === 'wide-leg') {
//     tipsList = `
//       <li>High-waisted styles work best to define your shape.</li>
//       <li>Pair with fitted tops to balance the volume on bottom.</li>
//       <li>Choose the right length - they should just graze the floor when wearing shoes.</li>
//       <li>Solid, dark washes create a more sophisticated look.</li>
//     `;
//   } else if (style === 'high-waisted') {
//     tipsList = `
//       <li>Tuck in your top to highlight the high waist and create definition.</li>
//       <li>Roll the cuffs for a more modern look.</li>
//       <li>Pair with sneakers for casual cool or heels to dress them up.</li>
//       <li>Choose a tapered leg to avoid looking too boxy.</li>
//     `;
//   } else if (style === 'flare') {
//     tipsList = `
//       <li>Wear with platform shoes or heels to maintain the dramatic length.</li>
//       <li>High-waisted styles create the most flattering silhouette.</li>
//       <li>Pair with fitted or cropped tops to balance the volume.</li>
//       <li>Darker washes create a sleek, elongated look.</li>
//     `;
//   } else if (style === 'relaxed') {
//     tipsList = `
//       <li>Keep the top more fitted to balance the relaxed bottom.</li>
//       <li>Cuff the hem for a more casual, styled look.</li>
//       <li>Choose a mid-rise for the most versatile fit.</li>
//       <li>Dark washes help create a more polished appearance.</li>
//     `;
//   } else if (style === 'tapered') {
//     tipsList = `
//       <li>Great for showing off shoes while maintaining a clean silhouette.</li>
//       <li>Works well with both casual and dressier tops.</li>
//       <li>Higher rise options help define the waist.</li>
//       <li>Choose a slight stretch for the most comfortable fit.</li>
//     `;
//   }
  
//   document.querySelector('.style-tips-list').innerHTML = tipsList;
  
//   // Show modal
//   modal.classList.add('active');
// }

// // Function to close modal
// function closeModal() {
//   document.getElementById('styleTipsModal').classList.remove('active');
// }

// // Function to toggle favorites
// function toggleFavorite(button, jeansName) {
//   button.classList.toggle('active');
  
//   // Get existing favorites from localStorage
//   let favorites = JSON.parse(localStorage.getItem('jeansFavorites')) || [];
  
//   if (button.classList.contains('active')) {
//     // Add to favorites if not already there
//     if (!favorites.includes(jeansName)) {
//       favorites.push(jeansName);
//       showToast('Added to favorites');
//     }
//   } else {
//     // Remove from favorites
//     let index = favorites.indexOf(jeansName);
//     if (index > -1) {
//       favorites.splice(index, 1);
//       showToast('Removed from favorites');
//     }
//   }
  
//   // Save updated favorites
//   localStorage.setItem('jeansFavorites', JSON.stringify(favorites));
  
//   // Update favorites display
//   updateFavoritesDisplay();
// }

// // Function to update favorites display
// function updateFavoritesDisplay() {
//   let favorites = JSON.parse(localStorage.getItem('jeansFavorites')) || [];
//   let favoritesContainer = document.getElementById('favorites-container');
  
//   // Clear existing favorites
//   favoritesContainer.innerHTML = '';
  
//   if (favorites.length === 0) {
//     // Show a message if no favorites
//     favoritesContainer.innerHTML = '<p class="no-favorites">You have no favorites yet. Click the heart icon to add jeans to your favorites.</p>';
//     return;
//   }
  
//   // Create elements for each favorite
//   favorites.forEach(jeansName => {
//     let favoriteCard = document.createElement('div');
//     favoriteCard.className = 'jeans-card';
    
//     let favoriteImg = document.createElement('img');
//     favoriteImg.src = getJeansImage(jeansName);
//     favoriteImg.alt = jeansName;
    
//     let favoriteInfo = document.createElement('div');
//     favoriteInfo.className = 'jeans-info';
    
//     let favoriteTitle = document.createElement('h3');
//     favoriteTitle.className = 'jeans-title';
//     favoriteTitle.textContent = jeansName;
    
//     let favoriteActions = document.createElement('div');
//     favoriteActions.className = 'jeans-actions';
    
//     let favoriteButton = document.createElement('button');
//     favoriteButton.className = 'favorite-btn active';
//     favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
//     favoriteButton.onclick = function() { toggleFavorite(this, jeansName); };
    
//     let tipsButton = document.createElement('button');
//     tipsButton.className = 'tips-btn';
//     tipsButton.innerHTML = '<i class="fas fa-info-circle"></i> Style Tips';
//     tipsButton.onclick = function() { openStyleTips(jeansName.toLowerCase().replace(' jeans', '')); };
    
//     // Assemble the card
//     favoriteActions.appendChild(favoriteButton);
//     favoriteActions.appendChild(tipsButton);
    
//     favoriteInfo.appendChild(favoriteTitle);
//     favoriteInfo.appendChild(favoriteActions);
    
//     favoriteCard.appendChild(favoriteImg);
//     favoriteCard.appendChild(favoriteInfo);
    
//     favoritesContainer.appendChild(favoriteCard);
//   });
  
//   // Update favorites tab button if it exists
//   let favoritesTabBtn = document.querySelector('.tab-btn[onclick="openTab(\'favorites-tab\')"]');
//   if (favoritesTabBtn) {
//     let favCount = document.createElement('span');
//     favCount.className = 'fav-count';
//     favCount.textContent = favorites.length;
    
//     // Remove existing count if present
//     let existingCount = favoritesTabBtn.querySelector('.fav-count');
//     if (existingCount) {
//       favoritesTabBtn.removeChild(existingCount);
//     }
    
//     favoritesTabBtn.appendChild(favCount);
//   }
// }

// // Function to show toast notification
// function showToast(message) {
//   let toast = document.getElementById('toast');
//   toast.textContent = message;
//   toast.classList.add('show');
  
//   setTimeout(function() {
//     toast.classList.remove('show');
//   }, 3000);
// }

// // Initialize the page
// document.addEventListener('DOMContentLoaded', function() {
//   // Set first tab as active by default
//   let firstTabBtn = document.querySelector('.tab-btn');
//   if (firstTabBtn) {
//     firstTabBtn.click();
//   }
  
//   // Update favorites display
//   updateFavoritesDisplay();
  
//   // Set up event listeners for the quiz form
//   let quizForm = document.getElementById('style-quiz-form');
//   if (quizForm) {
//     quizForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       processQuiz();
//     });
//   }  
// });
