let currentTab = "all";

const totalCount = document.getElementById('total');
const interviewCount = document.getElementById('Interview-count');
const rejectedCount = document.getElementById('Rejected-count');

const tabActive = ["bg-blue-600", "border-blue-600", "text-white"];
const tabInactive = ["bg-transparent", "text-gray-500", "border-gray-200"];

function switchTab(tab) {
    currentTab = tab;
    const tabs = ["all", "interview", "rejected"];

    for (const t of tabs) {
        const tabBtn = document.getElementById("tab-" + t);
        if (t === tab) {
            tabBtn.classList.remove(...tabInactive);
            tabBtn.classList.add(...tabActive);
        } else {
            tabBtn.classList.remove(...tabActive);
            tabBtn.classList.add(...tabInactive);
        }
    }
    updateUI();
}

function updateUI() {
    const allCards = document.querySelectorAll('#card-list > div > div');
    let visibleCards = 0;
    
    let intCount = 0;
    let rejCount = 0;

    allCards.forEach(card => {
        const statusText = card.querySelector('#status').innerText.trim().toLowerCase();
        
        if (statusText === "interview") intCount++;
        if (statusText === "rejected") rejCount++;

        if (currentTab === "all") {
            card.classList.remove('hidden');
            visibleCards++;
        } else if (statusText === currentTab) {
            card.classList.remove('hidden');
            visibleCards++;
        } else {
            card.classList.add('hidden');
        }
    });

    totalCount.innerText = allCards.length;
    interviewCount.innerText = intCount;
    rejectedCount.innerText = rejCount;

    const noJobsMsg = document.getElementById('no-jobs-msg');
    if (visibleCards === 0) {
        noJobsMsg.classList.remove('hidden');
        noJobsMsg.classList.add('flex');
    } else {
        noJobsMsg.classList.add('hidden');
        noJobsMsg.classList.remove('flex');
    }
}

document.getElementById('card-list').addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.bg-white');
    if (!card) return;

    const statusDisplay = card.querySelector('#status');

    if (target.id === 'Interview-btn-2') {
        statusDisplay.innerText = "INTERVIEW";
        statusDisplay.className = "text-[#10B981] font-medium text-[12.5px] py-1.5 px-3 inline-block mb-2 rounded-lg border-2 border-[#10B981]";
        updateUI(); 
    }

    if (target.id === 'Rejected-btn-2') {
        statusDisplay.innerText = "REJECTED";
        statusDisplay.className = "text-[#EF4444] font-medium text-[12.5px] py-1.5 px-3 inline-block mb-2 rounded-lg border-2 border-[#EF4444]";
        updateUI(); 
    }
});

updateUI();
switchTab('all');