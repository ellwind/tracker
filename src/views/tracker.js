class Tracker {
  #saveInProgress = false;
  constructor() {
    setInterval(() => {
      const events = this.#getEvents();
      if (events.length) {
        this.#saveEvents(events);
      }
    }, 1000);
  }

  #saveEvents(events) {
    if (!this.#saveInProgress) {
      this.#clear();
      this.#saveInProgress = true;
      fetch('http://localhost:8000/tracker', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status > 200) {
            throw data;
          }
          return data;
        })
        .catch((error) => {
          this.#addEvents(events);
          if (error.message === 'Validation error') {
            this.#clear();
          }
        })
        .finally(() => {
          this.#saveInProgress = false;
        });
    }
  }

  #addEvents(events) {
    const savedEvents = this.#getEvents();
    savedEvents.push(events);
    localStorage.setItem('trackerEvents', JSON.stringify(savedEvents));
    return savedEvents;
  }

  #getEvents() {
    return JSON.parse(localStorage.getItem('trackerEvents')) || [];
  }

  #clear() {
    localStorage.setItem('trackerEvents', '[]');
  }

  track(event, ...tags) {
    const eventsData = {
      event,
      tags,
      url: location.href,
      title: document.title,
      ts: new Date().toISOString(),
    };
    const events = this.#addEvents(eventsData);
    if (events.length >= 3) {
      this.#saveEvents(events);
    }
  }
}

const tracker = new Tracker();
