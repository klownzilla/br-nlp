chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "summarizeReview") {
        const reviewText = request.content;
        summarizeReviewText(reviewText, sendResponse);
    }
   return true;
});

async function summarizeReviewText(reviewText, sendResponse) {
    const kb64 = "cHBseC0yOTE1Nzc4NDk3ZTg2NjY4MzkzNjc5Y2U1ZjBiMjEyZmI4MjJiNGY3YWUwYzUyNzg=";
    const apiURL = "https://api.perplexity.ai/chat/completions";

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${atob(kb64)}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "user",
                        content: `The following is a review of a blu-ray movie. Summarize the review: ${reviewText}`,
                    },
                ]
            }),
        });

        const responseData = await response.json();
        if(response.ok) {
            sendResponse({
                action: "response",
                message: responseData.choices[0].message.content.replace(/\n/g, "<br>").trim(),
            });
        } else {
            sendResponse({
                action: "response",
                message: `Failed to sumamrize. Error: ${responseData["error"]["message"]}`,
            });
        }
    } catch(error) {
        sendResponse({
            action: "response",
            message: "Unexpected error occurred.",
        });
    }
}