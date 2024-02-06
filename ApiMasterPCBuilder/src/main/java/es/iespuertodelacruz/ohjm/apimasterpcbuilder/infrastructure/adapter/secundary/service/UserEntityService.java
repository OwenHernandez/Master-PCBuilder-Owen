package es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.service;

import es.iespuertodelacruz.ohjm.apimasterpcbuilder.domain.model.User;
import es.iespuertodelacruz.ohjm.apimasterpcbuilder.domain.port.secundary.IUserRepository;
import es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.mapper.UserEntityMapper;
import es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.persistence.UserEntity;
import es.iespuertodelacruz.ohjm.apimasterpcbuilder.infrastructure.adapter.secundary.repository.IUserEntityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserEntityService implements IUserRepository {

    @Autowired
    IUserEntityRepository repo;

    UserEntityMapper mapper;

    @Override
    public User findById(Integer id) {
        User user = null;
        if (id != null) {
            Optional<UserEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                UserEntity userEntity = opt.get();
                user = mapper.toDomain(userEntity);
            }
        }
        return user;
    }

    @Override
    public User findByNick(String nick) {
        User user = null;
        if (nick != null) {
            UserEntity ue = repo.findByNick(nick);
            user = mapper.toDomain(ue);
        }
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user = null;
        if (email != null) {
            UserEntity ue = repo.findByNick(email);
            user = mapper.toDomain(ue);
        }
        return user;
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        Iterable<UserEntity> repoAll = repo.findAll();
        for (UserEntity ue : repoAll) {
            User domain = mapper.toDomain(ue);
            users.add(domain);
        }

        return users;
    }

    @Override
    @Transactional
    public User save(User user) {
        User res = null;
        if (user != null) {
            UserEntity ue = new UserEntity();
            ue.setId(user.getId());
            ue.setNick(user.getNick());
            ue.setPassword(user.getPassword());
            ue.setRole(user.getRole());
            UserEntity save = repo.save(ue);
            res = mapper.toDomain(save);
        }
        return res;
    }
}
