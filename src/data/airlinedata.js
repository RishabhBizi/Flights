function generateRandomPrice() {
    return Math.floor(Math.random() * (190 - 80 + 1)) + 80;
}
function generateRandomTaxCharge(){
    return Math.floor(Math.random() * (45 - 20 + 1)) + 20;
}

export function getHardcodedData(origin,destination,day) {
    return [
        {
            "type": "flight-offer",
            "id": "1",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 3,
            "itineraries": [
                {
                    "duration": "PT2H8M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": `2025-02-27T08:00:00`
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "5",
                                "at": "2025-02-27T09:08:00"
                            },
                            "carrierCode": "F9",
                            "number": "1441",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "F9"
                            },
                            "duration": "PT2H8M",
                            "id": "1",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "F9"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "2",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 3,
            "itineraries": [
                {
                    "duration": "PT2H8M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": "2025-02-27T17:26:00"
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "5",
                                "at": "2025-02-27T18:34:00"
                            },
                            "carrierCode": "F9",
                            "number": "1595",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "F9"
                            },
                            "duration": "PT2H8M",
                            "id": "2",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "F9"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "3",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H16M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": "2025-02-27T13:15:00"
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "1",
                                "at": "2025-02-27T14:31:00"
                            },
                            "carrierCode": "UA",
                            "number": "1859",
                            "aircraft": {
                                "code": "320"
                            },
                            "operating": {
                                "carrierCode": "UA"
                            },
                            "duration": "PT2H16M",
                            "id": "3",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "UA"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "4",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H18M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": "2025-02-27T10:20:00"
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "1",
                                "at": "2025-02-27T11:38:00"
                            },
                            "carrierCode": "UA",
                            "number": "2298",
                            "aircraft": {
                                "code": "319"
                            },
                            "operating": {
                                "carrierCode": "UA"
                            },
                            "duration": "PT2H18M",
                            "id": "5",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "UA"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "5",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H16M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": "2025-02-27T15:46:00"
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "1",
                                "at": "2025-02-27T17:02:00"
                            },
                            "carrierCode": "UA",
                            "number": "516",
                            "aircraft": {
                                "code": "73G"
                            },
                            "operating": {
                                "carrierCode": "UA"
                            },
                            "duration": "PT2H16M",
                            "id": "4",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "UA"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "6",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": day,
            "lastTicketingDateTime": day,
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT2H19M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": origin,
                                "terminal": "N",
                                "at": "2025-02-27T19:05:00"
                            },
                            "arrival": {
                                "iataCode": destination,
                                "terminal": "1",
                                "at": "2025-02-27T20:24:00"
                            },
                            "carrierCode": "UA",
                            "number": "1046",
                            "aircraft": {
                                "code": "319"
                            },
                            "operating": {
                                "carrierCode": "UA"
                            },
                            "duration": "PT2H19M",
                            "id": "6",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                "base": generateRandomPrice(),
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": `${generateRandomTaxCharge()+generateRandomPrice()}`
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "UA"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": `${generateRandomTaxCharge()+generateRandomPrice()}`,
                        "base": generateRandomPrice()
                    }
                }
            ]
        }
    ]
}

