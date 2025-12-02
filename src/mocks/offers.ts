export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export const mockOffers: Offer[] = [
  // Paris
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '8',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: 'img/room.jpg'
  },
  {
    id: '9',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '10',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    previewImage: 'img/apartment-03.jpg'
  },
  // Hamburg
  {
    id: '11',
    title: 'Harbor view apartment',
    type: 'Apartment',
    price: 130,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '12',
    title: 'Comfortable room in Hamburg',
    type: 'Room',
    price: 75,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13
      }
    },
    location: {
      latitude: 53.5451,
      longitude: 9.9877,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
    previewImage: 'img/room.jpg'
  },
  // Dusseldorf
  {
    id: '13',
    title: 'Luxury apartment in Dusseldorf',
    type: 'Apartment',
    price: 160,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: 'img/apartment-03.jpg'
  },
  {
    id: '14',
    title: 'Budget-friendly room',
    type: 'Room',
    price: 70,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13
      }
    },
    location: {
      latitude: 51.2317,
      longitude: 6.7695,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.9,
    previewImage: 'img/room.jpg'
  }
];
