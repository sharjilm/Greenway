/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    Wrap,
    WrapItem,
    Center,
} from '@chakra-ui/react'
import { GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

var directionsRenderer;
var directionsService;
var mainMap;
var mac = { lat: 43.260988363514265, lng: -79.91930050375424 };
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

class MapContainer extends Component {
    render() {
        return (
            <Wrap>
                <WrapItem>
                    <Center w='180px' h='100vh'>
                        <GoogleMapReact
                            google={this.props.google}
                            mapTypeControl={false}
                            style={{ width: '100%', height: '100%' }}
                            zoom={13}
                            center={mac}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                        />
                    </Center>
                </WrapItem>
                <WrapItem>
                    <Center
                        p={4}
                        borderRadius='lg'
                        m={4}
                        bgColor='white'
                        shadow='base'
                        minW='container.sm'
                        zIndex='1'
                        marginLeft='-25%'
                    >
                        <HStack spacing={2} justifyContent='space-between'>
                            <Box flexGrow={1}>
                                <Input id='start' type='text' placeholder='Origin' />
                            </Box>
                            <Box flexGrow={1}>
                                <Input id='end' type='text' placeholder='Destination' />
                            </Box>
                            <ButtonGroup>
                                <Button colorScheme='blue' type='submit' onClick={calcRoute}>
                                    Calculate Route
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    </Center>
                </WrapItem>
            </Wrap>
        );
    }
}



// Once API is loaded set map
const apiIsLoaded = (map, maps) => {
    if (map) {
        mainMap = map;
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
    }
}

// Calculate Route
function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    // Set origin and destination and feed it to the directionsService
    if (start !== end && start !== '' && end !== '') {
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
        };

        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
                pathOverview(result);
            }
        });
    }
    // Reset map if input boxes are empty
    else {
        directionsRenderer.set('directions', null);
        mainMap.panTo(mac);
        mainMap.setZoom(13);
    }
}

// Gives an overview of the path in the console
function pathOverview(directionResult) {
    var myRoute = directionResult.routes[0].overview_path;
    var points = [];
    for (var i = 0; i < myRoute.length; i++) {
        // Display Lat and Lng of each point
        //console.log(myRoute[i].lat(), myRoute[i].lng());
        points.push({latitude: myRoute[i].lat(), longitude: myRoute[i].lng()});
    }
    
    axios.post("http://localhost:3001/db/elevation", {points: points}).then((response, error) => {
        console.log(response);
    })
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);