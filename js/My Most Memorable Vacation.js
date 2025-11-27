// js/Marco's Invention.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing script...');
    
    // Get DOM elements with null checks
    const backBtn = document.querySelector('.btn-back');
    const resetBtn = document.querySelector('.btn-reset');
    const checkBtn = document.querySelector('.btn-check');
    const feedback = document.getElementById('feedback');
    
    console.log('Buttons found:', {
        backBtn: !!backBtn,
        resetBtn: !!resetBtn,
        checkBtn: !!checkBtn,
        feedback: !!feedback
    });
    
    // Correct answers (multiple possible answers for some questions)
    const correctAnswers = {
        // Task One - accept multiple variations
        '1': ['summer 2007', 'summer', '2007', 'sunday'],
        '2': ['a fish', 'huge fish', 'type of fish'],
        '3': ['the bus was late', 'bus was late'],
        '4': ['watching whales', 'whale watching'],
        
        // Task Two
        '5': 'Virginia',
        '6': 'train',
        '7': 'saw a historical place',
        '8': 'scared'
    };
    
    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = "../Reading 3- Grade 11.html";
        });
    }
    
    // Reset button functionality
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('Reset button clicked');
            // Clear all text inputs
            const answerInputs = document.querySelectorAll('.answer-input');
            answerInputs.forEach(input => {
                input.value = '';
                input.style.borderColor = '#ddd';
            });
            
            // Clear all radio buttons and reset their styles
            const radioInputs = document.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(radio => {
                radio.checked = false;
                radio.parentElement.style.backgroundColor = '';
            });
            
            // Hide feedback
            if (feedback) {
                feedback.style.display = 'none';
                feedback.textContent = '';
                feedback.className = 'feedback';
            }
        });
    }
    
    // Check answers button functionality
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            console.log('Check button clicked!');
            
            let allCorrect = true;
            let score = 0;
            const totalQuestions = 8;
            
            // Get all elements fresh each time
            const answerInputs = document.querySelectorAll('.answer-input');
            console.log('Found answer inputs:', answerInputs.length);
            
            const radioInputs = document.querySelectorAll('input[type="radio"]');
            console.log('Found radio inputs:', radioInputs.length);
            
            // Reset all styles first
            answerInputs.forEach(input => {
                input.style.borderColor = '#ddd';
            });
            
            radioInputs.forEach(radio => {
                radio.parentElement.style.backgroundColor = '';
            });
            
            // Check Task One answers (questions 1-4)
            for (let i = 1; i <= 4; i++) {
                const answerInputs = document.querySelectorAll('.task:first-child .answer-input');
                const answerInput = answerInputs[i-1];
                
                console.log(`Question ${i} input:`, answerInput);
                
                if (!answerInput) {
                    console.error(`Could not find answer input for question ${i}`);
                    allCorrect = false;
                    continue;
                }
                
                const userAnswer = answerInput.value.trim().toLowerCase();
                const correctAnswerOptions = correctAnswers[i];
                
                console.log(`Question ${i} - User answer: "${userAnswer}", Correct options:`, correctAnswerOptions);
                
                let isCorrect = false;
                
                // Check if user's answer matches any of the correct options
                if (Array.isArray(correctAnswerOptions)) {
                    isCorrect = correctAnswerOptions.some(correctAnswer => 
                        userAnswer === correctAnswer.toLowerCase()
                    );
                } else {
                    isCorrect = userAnswer === correctAnswerOptions.toLowerCase();
                }
                
                if (isCorrect && userAnswer !== '') {
                    score++;
                    answerInput.style.borderColor = '#28a745';
                    console.log(`Question ${i}: CORRECT`);
                } else {
                    allCorrect = false;
                    answerInput.style.borderColor = '#dc3545';
                    console.log(`Question ${i}: INCORRECT`);
                }
            }
            
            // Check Task Two answers (questions 5-8)
            for (let i = 5; i <= 8; i++) {
                const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
                console.log(`Question ${i} selected option:`, selectedOption);
                
                if (selectedOption) {
                    const userAnswer = selectedOption.nextElementSibling.textContent.trim();
                    const correctAnswer = correctAnswers[i];
                    
                    console.log(`Question ${i} - User answer: "${userAnswer}", Correct: "${correctAnswer}"`);
                    
                    if (userAnswer === correctAnswer) {
                        score++;
                        selectedOption.parentElement.style.backgroundColor = '#d4edda';
                        console.log(`Question ${i}: CORRECT`);
                    } else {
                        allCorrect = false;
                        selectedOption.parentElement.style.backgroundColor = '#f8d7da';
                        console.log(`Question ${i}: INCORRECT`);
                    }
                } else {
                    allCorrect = false;
                    console.log(`Question ${i}: NO ANSWER SELECTED`);
                    // Highlight that no answer was selected
                    const options = document.querySelectorAll(`input[name="q${i}"]`);
                    options.forEach(option => {
                        option.parentElement.style.backgroundColor = '#fff3cd';
                    });
                }
            }
            
            // Show feedback
            if (feedback) {
                feedback.style.display = 'block';
                if (allCorrect && score === totalQuestions) {
                    feedback.textContent = `Excellent! You got all ${totalQuestions} questions correct!`;
                    feedback.className = 'feedback correct';
                } else {
                    feedback.textContent = `You got ${score} out of ${totalQuestions} questions correct. Try again!`;
                    feedback.className = 'feedback incorrect';
                }
            }
            
            console.log(`Final - Score: ${score}/${totalQuestions}, All correct: ${allCorrect}`);
        });
    } else {
        console.error('Check button not found!');
    }
});