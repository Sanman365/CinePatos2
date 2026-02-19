import java.util.Scanner;

public class PromedioSimple {
    
    public  void prom () {
        Scanner scanner = new Scanner(System.in);
        
        double suma = 0;
        
        System.out.println("=== PROMEDIO DE 5 CALIFICACIONES ===");
        
        for (int i = 1; i <= 5; i++) {
            System.out.print("Calificación " + i + ": ");
            double calificacion = scanner.nextDouble();
            suma += calificacion;
        }
        
        double promedio = suma / 5;
        System.out.println("El promedio es: " + promedio);
        
        scanner.close();
    }
}