document.addEventListener("DOMContentLoaded", () => {
    const summarizeReviewButton = document.getElementById("summarizeReviewButton");

    summarizeReviewButton.addEventListener("click", async () => {
        const [reviewPage] = await chrome.tabs.query(
            {
                active: true,
                lastFocusedWindow: true
            }
        );
        if(reviewPage) {
            summarize(reviewPage);
        } else {
            console.error("Page not found.");
        } 
    })
})

function summarize(reviewPage) {
    const summarizedReview = document.getElementById("summarizedReview");

    chrome.scripting.executeScript(
        {
            target: {tabId: reviewPage.id},
            function: () => {
                const reviewElementIds = ["movie_review_intro", "movie_review_video", "movie_review_audio", "movie_review_extras", "movie_review_overall"];
                const cleanTextContent = (text) => {
                    return text
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\$\(\s*window\s*\)\.on\('load',.*?img\.attr\('src',\s*'.*?'\);\s*\}\s*\);/g, "")
                    .trim();
                };
                const reviewText = reviewElementIds
                .map(id => {
                    const reviewElement = document.getElementById(id);
                    return reviewElement ? cleanTextContent(reviewElement.textContent) : "";
                })
                .filter((text) => text)
                .join("\n");
                return reviewText;
            }
        },
        (results) => {
            if(!results || results.length == 0 || !results[0].result) {
                summarizedReview.innerHTML = "Review not found on page!";
                console.error("Review not found on page!");
                return;
            }

            summarizedReview.innerHTML = "Summarizing...";
            const reviewText = results[0].result;
            chrome.runtime.sendMessage(
                {
                    action: "summarizeReview",
                    content: reviewText
                },
                (response) => {
                    if(response && response.action === "response") {
                        summarizedReview.innerHTML = response.message;
                    }
            });
        }
    )
}