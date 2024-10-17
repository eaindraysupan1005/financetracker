package th.mfu;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import th.mfu.domain.Concert;

@SpringBootTest
public class ConcertControllerTest {

    @Autowired
    private ConcertController controller ;

    @MockBean
    private ConcertRepository concertRepository;

    @Test
    public void createAndGet(){
        Concert concert = new Concert("Concert Title", LocalDateTime.of(2024, 1, 1, 20, 0));
        //create
        ResponseEntity<String> response = controller.createConcert(concert);
        assert response.getStatusCode() == HttpStatus.CREATED;

        //retrieve
        when(concertRepository.findById(1L)).thenReturn(Optional.of(concert));
        ResponseEntity<Concert> responseGet = controller.retrieveConcert(1L);
        assert responseGet.getStatusCode() == HttpStatus.OK;
        
    }

    @Test
    public void createAndUpdate(){
        Concert concert = new Concert("Concert Title", LocalDateTime.of(2024, 1, 1, 20, 0));
        //create
        ResponseEntity<String> response = controller.createConcert(concert);
        assert response.getStatusCode() == HttpStatus.CREATED;

        //update
        when(concertRepository.findById(1L)).thenReturn(Optional.of(concert));
        concert.setTitle("Update Title");
        ResponseEntity<String> responseUpdate = controller.updateConcert(concert, 1L);
        assert responseUpdate.getStatusCode() == HttpStatus.NO_CONTENT;
    }

    @Test
    public void createAndDelete(){
        Concert concert = new Concert("Concert Title", LocalDateTime.of(2024, 1, 1, 20, 0));
        //create
        ResponseEntity<String> response = controller.createConcert(concert);
        assert response.getStatusCode() == HttpStatus.CREATED;

        //delete
        when(concertRepository.findById(1L)).thenReturn(Optional.of(concert));
        ResponseEntity<String> responseDelete = controller.delete(1L);
        assert responseDelete.getStatusCode() == HttpStatus.NO_CONTENT;
    }

   
}
