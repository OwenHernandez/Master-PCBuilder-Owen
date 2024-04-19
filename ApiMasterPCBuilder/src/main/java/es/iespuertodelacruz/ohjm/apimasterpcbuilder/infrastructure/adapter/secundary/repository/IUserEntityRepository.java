package es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.repository;

import es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.persistence.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IUserEntityRepository extends JpaRepository<UserEntity, Long> {
    @Query(value = "SELECT * FROM USERS u WHERE u.NICK = :nick", nativeQuery = true)
    UserEntity findByNick(@Param("nick") String nick);

    @Query(value = "SELECT * FROM USERS u WHERE u.EMAIL = :email", nativeQuery = true)
    UserEntity findByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM USERS u WHERE u.ROLE = :role", nativeQuery = true)
    List<UserEntity> findByRole(@Param("role") String role);
}