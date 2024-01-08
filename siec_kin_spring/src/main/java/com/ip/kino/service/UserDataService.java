package com.ip.kino.service;

import com.ip.kino.dto.*;
import com.ip.kino.model.User;
import com.ip.kino.repository.AdminRepository;
import com.ip.kino.repository.ClientRepository;
import com.ip.kino.repository.EmployeeRepository;
import com.ip.kino.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDataService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;
    private final AdminRepository adminRepository;

    public UserDataDto getUserByLogin(String login){
        User user = userRepository.findByLogin(login).orElseThrow();
        ClientDto clientDto = new ClientDto();
        AdminDto adminDto = new AdminDto();
        EmployeeDto employeeDto = new EmployeeDto();
        if(user.getClient() != null){
            clientDto.setClientId(user.getClient().getClientId());
            clientDto.setWallet(user.getClient().getWallet());
            clientDto.setReservationCount(user.getClient().getReservationCount());
            adminDto=null;
            employeeDto =null;
        } else if (user.getAdmin() != null) {
            adminDto.setAdminId(user.getAdmin().getAdminId());
            employeeDto = null;
            clientDto =null;
        } else if (user.getEmployee() != null) {
            employeeDto.setEmployeeId(user.getEmployee().getEmployeeId());
            employeeDto.setPosition(user.getEmployee().getPosition());
            employeeDto.setKino(user.getEmployee().getCinema());
            clientDto = null;
            adminDto=null;
        }
        return new UserDataDto(
                    user.getUserId(),
                    user.getLogin(),
                    user.getEmail(),
                    user.getName(),
                    user.getSurname(),
                    user.getPhone(),
                    user.getCreateDate(),
                    user.getRole(),
                clientDto,
                    adminDto,
                employeeDto

            );
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String blockOrUnblockAccount(Long id) {
        User user = userRepository.findByUserId(id).orElseThrow();
        if(user.getBlockade()){
            user.setBlockade(false);
            userRepository.save(user);
            return "User has been unblocked.";
        }
        user.setBlockade(true);
        userRepository.save(user);
        return "User has been blocked.";
    }

    public String deleteAccount(Long id) {
        try {
//            uzytkownikRepository.deleteUser(id);
            User user = userRepository.findByUserId(id).orElseThrow();
            System.out.println(user.getUserId());
            userRepository.delete(user);
            return "Account has been deleted.";
        } catch (Exception ex) {
            // Obsługa ewentualnych błędów
            ex.printStackTrace();
            return "Error deleting account.";
        }
    }

    public Object changePassword(ChangePasswordDto passwordData) {
        try{
            User user = userRepository.findByUserId(passwordData.getId()).orElseThrow();
            if(!passwordEncoder.matches(passwordData.getOldPassword(), user.getPassword())){
                return "Old password does not match with current one";
            }
            String encodedNewPassword = passwordEncoder.encode(passwordData.getNewPassword());
            user.setPasswd(encodedNewPassword);

            userRepository.save(user);
            return "Password successfully changed";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error changing password.";
        }
    }

    public Object changePersonalData(ChangePersonalDataDto changePersonalDataDto) {
        try{
            User user = userRepository.findByUserId(changePersonalDataDto.getId()).orElseThrow();
            user.setName(changePersonalDataDto.getName());
            user.setSurname(changePersonalDataDto.getSurname());
            user.setPhone(changePersonalDataDto.getPhone());
            userRepository.save(user);
            return "Data changed succesfully";
        }
        catch (Exception ex){
            ex.printStackTrace();
            return "Error changing personal data.";
        }
    }

//    public String changeRole(Long id, String role) {
//        Uzytkownik user = uzytkownikRepository.findByIdUzytkownika(id).orElseThrow();
//        if(user.getRole().toString().equals(role)){
//            return "User already has that role.";
//        }
//
//        if(user.getRole() == Role.USER){
//            Klient klient = user.getKlient();
//            if(role.equals("ADMIN")){
//
//            }
//        }
//    }
}
