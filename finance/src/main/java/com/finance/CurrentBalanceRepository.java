package com.finance;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finance.domain.CurrentBalance;
import com.finance.domain.User;

@Repository
public interface CurrentBalanceRepository extends JpaRepository<CurrentBalance, Long> {
    // Find the CurrentBalance by user ID
    Optional<CurrentBalance> findByUserId(Long userId);

    // Alternatively, if you prefer finding by User entity directly
    Optional<CurrentBalance> findByUser(User user);

}
