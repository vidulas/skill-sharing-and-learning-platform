package backend.exception;

public class PersonalizGoalsNotFoundException extends RuntimeException {
    public PersonalizGoalsNotFoundException(String id) {
        super("Could not find goal with id: " + id);
    }
}