// Simulated Client-Side Database for Live Sports Data
// This service runs a background interval to randomly update the IPL points table,
// simulating real-time match completions.

let iplStandings = [
  { team: 'Kolkata Knight Riders', pld: 14, w: 9, l: 3, nrr: 1.428, pts: 20 },
  { team: 'Sunrisers Hyderabad', pld: 14, w: 8, l: 5, nrr: 0.414, pts: 17 },
  { team: 'Rajasthan Royals', pld: 14, w: 8, l: 5, nrr: 0.273, pts: 17 },
  { team: 'Royal Challengers Bengaluru', pld: 14, w: 7, l: 7, nrr: 0.459, pts: 14 },
  { team: 'Chennai Super Kings', pld: 14, w: 7, l: 7, nrr: 0.392, pts: 14 },
  { team: 'Delhi Capitals', pld: 14, w: 7, l: 7, nrr: -0.377, pts: 14 },
  { team: 'Lucknow Super Giants', pld: 14, w: 7, l: 7, nrr: -0.667, pts: 14 },
  { team: 'Gujarat Titans', pld: 14, w: 5, l: 7, nrr: -1.063, pts: 12 },
  { team: 'Punjab Kings', pld: 14, w: 5, l: 9, nrr: -0.353, pts: 10 },
  { team: 'Mumbai Indians', pld: 14, w: 4, l: 10, nrr: -0.318, pts: 8 },
];

// Start background mutation simulation
setInterval(() => {
  // Randomly select one team to "win" a game and one to "lose"
  const indexA = Math.floor(Math.random() * iplStandings.length);
  let indexB = Math.floor(Math.random() * iplStandings.length);
  while (indexA === indexB) {
    indexB = Math.floor(Math.random() * iplStandings.length);
  }

  // Update stats
  iplStandings[indexA].w += 1;
  iplStandings[indexA].pts += 2;
  iplStandings[indexA].pld += 1;
  iplStandings[indexA].nrr += (Math.random() * 0.1);

  iplStandings[indexB].l += 1;
  iplStandings[indexB].pld += 1;
  iplStandings[indexB].nrr -= (Math.random() * 0.1);

  // Re-sort table based on points first, then NRR
  iplStandings.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    return b.nrr - a.nrr;
  });

}, 15000); // Simulate an update every 15 seconds

export const database = {
  fetchIPLStandings: async () => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a snapshot with formatted ranks and NRR
        const snapshot = iplStandings.map((team, index) => ({
          rank: index + 1,
          team: team.team,
          pld: team.pld,
          w: team.w,
          l: team.l,
          nrr: team.nrr > 0 ? `+${team.nrr.toFixed(3)}` : team.nrr.toFixed(3),
          pts: team.pts
        }));
        resolve(snapshot);
      }, 1000);
    });
  }
};
