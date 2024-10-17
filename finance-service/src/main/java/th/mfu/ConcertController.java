package th.mfu;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import th.mfu.domain.Concert;

@RestController
public class ConcertController {

  
    // TODO: add repository
    @Autowired
    private ConcertRepository concertRepository;

    // TODO: add @GET and @Path
    @GetMapping("/concerts/{id}")
    public ResponseEntity<Concert> retrieveConcert(@PathVariable("id") long id) { // TODO: add @PathVariable for id

        // TODO: find concert by ID suing em.find(...
        Optional<Concert> concert = concertRepository.findById(id);
        if (concert.isPresent()) {
            Concert entity = concert.get();
            return new ResponseEntity<>(entity, HttpStatus.OK);
        } else {
            // Handle the case when no entity is found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    // TODO: add @GET and @Path
    @GetMapping("/concerts")
    public ResponseEntity<List<Concert>> retrieveAllConcert() {
        // TODO: get all concert
        List<Concert> concerts = concertRepository.findAll();

        return new ResponseEntity<>(concerts, HttpStatus.OK);

    }

    // TODO: add proper annotation Post verb
    @PostMapping("/concerts")
    public ResponseEntity<String> createConcert(@RequestBody Concert concert) {

        // TODO save concert to database using repository
        concertRepository.save(concert);

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    // TODO: add proper annotation Put verb
    @PutMapping("/concerts/{id}")
    public ResponseEntity<String> updateConcert(@RequestBody Concert concert, @PathVariable("id") long id) {

        Optional<Concert> con = concertRepository.findById(id);
        if(!con.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        concert.setId(id);

        // TODO update concert using em.merge(..
        concertRepository.save(concert);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // TODO: add annotation for Delete verb and and @Path for id
    @DeleteMapping("/concerts/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") long id) { // TODO: add @PathVariable for id

        Optional<Concert> optionalEntity = concertRepository.findById(id);

        if (optionalEntity.isPresent()) {
            Concert concert = optionalEntity.get();
            // Do something with the entity
            // TODO: delete concert using em.remove
            concertRepository.delete(concert);
        } else {
            // Return a HTTP 404 response if the specified Concert isn't found.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    // TODO: add annotation for Delete verb
    @DeleteMapping("/concerts")
    public ResponseEntity<String> deleteAllConcerts() {

        // TODO: query to get all concerts into a list using guideline in the reference
        concertRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
